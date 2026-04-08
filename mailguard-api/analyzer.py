import re
import random

def analyze_email(email_data):
    """
    Simulates ML and heuristics analysis on given email data.
    """
    subject = email_data.get('subject', '').lower()
    body = email_data.get('body', '').lower()
    sender = email_data.get('sender', '').lower()

    score = 0
    threats = []
    mitre_mappings = []
    
    # 1. Header Analysis (SPF/DKIM anomaly simulation)
    if not sender.endswith('trusted.com') and sender != "":
        if 'paypal' in sender or 'apple' in sender or 'support' in sender or 'bank' in sender:
            score += 45
            threats.append(f"Suspicious Sender Domain (Spoofing Attempt): {sender}")
            mitre_mappings.append({"id": "T1566.002", "name": "Spearphishing Link", "desc": "Adversaries may use spoofed domains to impersonate trusted entities."})
    
    # 2. Body / NLP Analysis
    urgent_keywords = ['urgent', 'immediate action', 'suspended', 'verify your account', 'password expire', 'click here', 'act now']
    found_keywords = [kw for kw in urgent_keywords if kw in body or kw in subject]
    
    if len(found_keywords) > 0:
        score += 20 * len(found_keywords)
        threats.append(f"Urgency/Fear framing detected: {', '.join(found_keywords)}")
        mitre_mappings.append({"id": "T1204.001", "name": "User Execution: Malicious Link", "desc": "Attempting to force user interaction via urgency or fear."})

    # 3. Link Reputation (Simulated)
    urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', body)
    malicious_url_found = False
    for url in urls:
        if "login" in url or "update" in url or "secure" in url or "-" in url:
            if "trusted.com" not in url:
                score += 40
                threats.append(f"Malicious URL Detected: {url}")
                mitre_mappings.append({"id": "T1204.001", "name": "User Execution: Malicious Link", "desc": "Lures user to a credential harvesting site via obfuscated link."})
                malicious_url_found = True
                break
                
    if score == 0 and len(urls) == 0 and body != "":
        score = random.randint(0, 15) # Base natural risk
        
    score = min(score, 100)
    
    if score >= 60:
        status = "Critical Phishing Threat"
    elif score >= 30:
        status = "Suspicious"
    else:
        status = "Safe"
        
    if not threats and status == "Safe" and body != "":
        threats.append("No common phishing traits detected. Standard security checks passed.")

    return {
        "score": score,
        "status": status if body != "" else "Idle",
        "threats": threats,
        "mitre_mappings": mitre_mappings,
        "analyzed_components": {
            "urls_checked": len(urls),
            "nlp_severity": "High" if len(found_keywords) >= 2 else ("Low" if len(found_keywords) == 0 else "Medium"), 
            "domains_verified": "Fail" if score > 30 and 'trusted.com' not in sender else "Pass"
        }
    }
