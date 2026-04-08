import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Target } from 'lucide-react';

export default function ThreatReport({ report }) {
  if (!report) {
    return (
      <div className="card">
        <h2>Threat Report</h2>
        <div className="empty-state">
          <ShieldAlert size={48} color="#e2e8f0" style={{ margin: '0 auto 1rem' }} />
          <p>Submit an email to generate a threat analysis report.</p>
        </div>
      </div>
    );
  }

  const getBadgeClass = (status) => {
    if (status?.includes('Safe')) return 'safe';
    if (status?.includes('Critical')) return 'critical';
    return 'suspicious';
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Threat Report</h2>
        <span className={`badge ${getBadgeClass(report.status)}`}>
          {report.status}
        </span>
      </div>

      <div style={{ margin: '1.5rem 0', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
          {report.score}<span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>/100</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Phishing Probability Score</p>
      </div>

      {report.threats && report.threats.length > 0 && (
        <div className="report-section">
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {report.status === 'Safe' ? <CheckCircle2 color="#10b981" /> : <AlertTriangle color="#ef4444" />}
            Analysis Details
          </h3>
          {report.threats.map((threat, idx) => (
            <div key={idx} className={report.status === 'Safe' ? 'threat-item safe' : 'threat-item'} style={report.status === 'Safe' ? {background: 'var(--success-light)', color: '#047857'} : {}}>
              {threat}
            </div>
          ))}
        </div>
      )}

      {report.mitre_mappings && report.mitre_mappings.length > 0 && (
        <div className="report-section">
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target color="#818cf8" />
            MITRE ATT&CK Mappings
          </h3>
          {report.mitre_mappings.map((mapping, idx) => (
            <div key={idx} className="mitre-card">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span className="mitre-id">{mapping.id}</span>
                <strong>{mapping.name}</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {mapping.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
