import { useState } from 'react';

interface DateSelectorProps {
  onDateSubmit: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDateSubmit(selectedDate);
  };

  return (
    <div className="date-selector-overlay">
      <div className="date-selector-modal">
        <h2>Kitchen Dashboard</h2>
        <p>Select a date to view kitchen orders</p>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
          <button type="submit" className="submit-button">
            View Orders
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateSelector;