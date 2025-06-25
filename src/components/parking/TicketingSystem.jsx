
import React, { useState } from 'react';
import './TicketingSystem.css';

export const TicketingSystem = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    driverName: '',
    duration: '2',
  });
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateTicket = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const ticket = {
      id: `PKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      vehicleNumber: formData.vehicleNumber,
      driverName: formData.driverName,
      entryTime: new Date(),
      duration: parseInt(formData.duration),
      spaceNumber: `A-${Math.floor(Math.random() * 50) + 1}`,
    };

    setGeneratedTicket(ticket);
    setIsGenerating(false);
    setFormData({ vehicleNumber: '', driverName: '', duration: '2' });
  };

  return (
    <div className="ticketing-container">
      <div className="ticketing-header">
        <h2 className="ticketing-title">
          <span className="title-icon">🎫</span>
          Digital Parking Tickets
        </h2>
        <p className="ticketing-subtitle">Generate instant parking tickets with QR codes</p>
      </div>

      <div className="ticketing-grid">
        {/* Ticket Generation Form */}
        <div className="form-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">🚗</span>
              Vehicle Details
            </h3>
          </div>
          <div className="card-content">
            <form onSubmit={generateTicket} className="form">
              <div className="form-group">
                <label htmlFor="vehicleNumber" className="form-label">
                  Vehicle Number
                </label>
                <input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  placeholder="ABC-1234"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="driverName" className="form-label">
                  Driver Name
                </label>
                <input
                  id="driverName"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration" className="form-label">
                  Parking Duration (hours)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  max="24"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="submit-button"
              >
                {isGenerating ? (
                  <div className="button-loading">
                    <div className="spinner"></div>
                    Generating Ticket...
                  </div>
                ) : (
                  'Generate Parking Ticket'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Generated Ticket Display */}
        <div className="ticket-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">🎫</span>
              Generated Ticket
            </h3>
          </div>
          <div className="card-content">
            {generatedTicket ? (
              <div className="ticket-display">
                <div className="ticket-header">
                  <h3 className="ticket-title">ParkVista Ticket</h3>
                  <span className="success-icon">✅</span>
                </div>
                
                <div className="ticket-details">
                  <div className="detail-row">
                    <span className="detail-label">Ticket ID:</span>
                    <span className="detail-value">{generatedTicket.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Vehicle:</span>
                    <span className="detail-value">{generatedTicket.vehicleNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Driver:</span>
                    <span className="detail-value">{generatedTicket.driverName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Space:</span>
                    <span className="detail-value">{generatedTicket.spaceNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Entry Time:</span>
                    <span className="detail-value">{generatedTicket.entryTime.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{generatedTicket.duration} hours</span>
                  </div>
                </div>

                <div className="qr-section">
                  <div className="qr-code">
                    <div className="qr-placeholder">
                      QR Code<br />
                      <span className="qr-icon">⏰</span>
                    </div>
                  </div>
                  <p className="qr-text">
                    Scan to validate parking
                  </p>
                </div>
              </div>
            ) : (
              <div className="no-ticket">
                <span className="no-ticket-icon">🎫</span>
                <p>Fill out the form to generate a parking ticket</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
