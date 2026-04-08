from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import analyze_email

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    result = analyze_email(data)
    return jsonify(result), 200

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
