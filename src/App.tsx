import { useState } from "react";
import { HuddleData } from "./types";
import { fetchHuddleData } from "./api";
import DateSelector from "./components/DateSelector";
import "./App.css";

function App() {
  const [huddle, setHuddle] = useState<HuddleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDateSubmit = async (date: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchHuddleData(date);
      setHuddle(data);
      setShowDateSelector(false);
    } catch (err) {
      setError("No bookings found for this date");
      setHuddle(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowDateSelector(true);
    setHuddle(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading kitchen data...</p>
        </div>
      </div>
    );
  }

  if (showDateSelector) {
    return <DateSelector onDateSubmit={handleDateSubmit} />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>🍽️</h2>
          <p className="error-message">{error}</p>
          <button onClick={handleReset} className="reset-button">
            Select Different Date
          </button>
        </div>
      </div>
    );
  }

  if (!huddle) return null;

  return (
    <div className="kitchen-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Kitchen Dashboard</h1>
          <div className="date-section">
            <p className="date">
              {new Date(huddle.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <button onClick={handleReset} className="change-date-button">
              Change Date
            </button>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-box">
            <span className="stat-value">{huddle.total_reservations}</span>
            <span className="stat-label">Reservations</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{huddle.total_guests}</span>
            <span className="stat-label">Guests</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{huddle.total_orders}</span>
            <span className="stat-label">Orders</span>
          </div>
        </div>
      </header>

      {/* Dietary Alerts Section */}
      {Object.keys(huddle.dietary_requirements).length > 0 && (
        <section className="dietary-alerts">
          <h2>⚠️ Dietary Requirements</h2>
          <div className="dietary-tags">
            {Object.entries(huddle.dietary_requirements).map(([requirement, count]) => (
              <div key={requirement} className="dietary-tag">
                <span className="tag-count">{count}</span>
                <span className="tag-label">{requirement}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tables Grid */}
      <section className="tables-grid">
        {huddle.table_insights.map((table) => (
          <div key={table.name} className={`table-card ${table.complexity >= 3 ? 'high-complexity' : ''}`}>
            <div className="table-header">
              <h3>{table.name}</h3>
              <span className="party-size">Party of {table.party_size}</span>
            </div>
            
            <div className="table-metrics">
              <div className="metric" >
                <span className="metric-label">Prep Time</span>
                <span className="metric-value">{table.prep_time} min</span>
              </div>
              <div className="metric" style={{ textAlign: 'right' }}>
                <span className="metric-label">Complexity</span>
                <div className="complexity-indicator">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`dot ${i < table.complexity ? 'active' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="orders-list">
              {table.orders.map((order, index) => (
                <div key={index} className="order-item">
                  <div className="order-details">
                    <span className="order-name">{order.item}</span>
                    <span className="order-price">${order.price}</span>
                  </div>
                  {order.dietary_tags.length > 0 && (
                    <div className="dietary-tags">
                      {order.dietary_tags.map(tag => (
                        <span key={tag} className="dietary-tag-small">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {table.kitchen_notes.length > 0 && (
              <div className="kitchen-notes">
                <span className="notes-icon">📝</span>
                {table.kitchen_notes.map((note, index) => (
                  <p key={index}>{note}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;


