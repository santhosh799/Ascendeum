import React, { useState, useCallback } from "react";

function Header({ start, pause, reset }) {
  const [timer, setTimer] = useState(1);
  const onTimerValueChange = useCallback((e) => {
    setTimer((prevValue) => {
      let value = Number(e.target.value);
      if (value > 10) {
        return 10;
      }
      if (value < 1) {
        return 1;
      }
      return value;
    });
  }, []);

  const onStart = () => {
    start(timer);
  };

  const onReset = () => {
    setTimer(1);
    reset();
  };

  return (
    <header>
      <button onClick={onStart}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={onReset}>Reset</button>

      <input
        value={timer}
        onChange={onTimerValueChange}
        placeholder="timer"
        type="number"
      />
    </header>
  );
}

export default Header;
