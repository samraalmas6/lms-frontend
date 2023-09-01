import React, { useState } from 'react';

const Timer = ({ onSetTimer }) => {
  const [timerValue, setTimerValue] = useState(120); // Default timer value in seconds

  const handleTimerChange = (e) => {
    const newTimerValue = parseInt(e.target.value, 10);
    setTimerValue(newTimerValue);
  };

  const handleSetTimer = () => {
    onSetTimer(timerValue);
  };

  return (
    <div className="instructor-timer">
      <h2>Set Quiz Timer</h2>
      <div>
        <label>
          Timer Duration (seconds):
          <input
            type="number"
            value={timerValue}
            onChange={handleTimerChange}
            min={1}
            step={1}
          />
        </label>
      </div>
      <button onClick={handleSetTimer}>Set Timer</button>
    </div>
  );
};




export default Timer;
