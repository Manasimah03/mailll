import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Dashboard({ onAnalyze, isLoading }) {
  const [formData, setFormData] = useState({
    sender: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <div className="card">
      <h2>Analyze Email Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sender">Sender Address</label>
          <input
            type="text"
            id="sender"
            name="sender"
            placeholder="e.g., support@paypal-verify.com"
            value={formData.sender}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject Line</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="e.g., URGENT: Account Suspended"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Email Body (Text or HTML content)</label>
          <textarea
            id="body"
            name="body"
            rows="6"
            placeholder="Paste the email content here. Include any URLs..."
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          <ShieldCheck size={20} />
          {isLoading ? 'Scanning...' : 'Scan for Threats'}
        </button>
      </form>
    </div>
  );
}
