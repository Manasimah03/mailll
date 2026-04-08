import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ThreatReport from './components/ThreatReport';
import Chatbot from './components/Chatbot';

function App() {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (emailData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error("Failed to analyze email", error);
      // Fallback for demo if backend isn't running
      setReportData({
        status: 'Error',
        score: 0,
        threats: ['Failed to connect to the analysis engine. Please ensure the backend is running on port 5000.'],
        mitre_mappings: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>MailGuard</h1>
        <p>Intelligent, Friendly Phishing Detection System</p>
      </header>

      <main className="main-content">
        <Dashboard onAnalyze={handleAnalyze} isLoading={isLoading} />
        <ThreatReport report={reportData} />
      </main>

      <Chatbot />
    </div>
  );
}

export default App;
