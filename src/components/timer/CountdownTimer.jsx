import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      // If the timer hits zero, clear the interval
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function getTimeLeft(targetDate) {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 3600));
    const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      total: difference,
      days: days > 0 ? days : null,
      hours: days === 0 ? (hours < 10 ? `0${hours}` : hours) : null,
      minutes: days === 0 ? (minutes < 10 ? `0${minutes}` : minutes) : null,
      seconds: days === 0 ? (seconds < 10 ? `0${seconds}` : seconds) : null,
    };
  }

  return (
    <span>
      {timeLeft.total > 0 ? (
        <span>
          {timeLeft.days !== null ? (
            <span>{timeLeft.days} روز باقی مانده</span>
          ) : (
            <span>
              {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </span>
          )}
        </span>
      ) : (
        <span>Time's up!</span>
      )}
    </span>
  );
};

export default CountdownTimer;
