import React, { useEffect, useState } from 'react';
import styles from './EventTimer.module.sass';

const EventTimer = ({ event, onDelete, getProgressPercent }) => {
  const [remainingTime, setRemainingTime] = useState('');

  const calculateRemainingTime = () => {
    const diffMs =
      new Date(`${event.date}T${event.time}`).getTime() - Date.now();
    if (diffMs <= 0) return "Time's up!";

    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    return [
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      `${seconds}s`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  useEffect(() => {
    setRemainingTime(calculateRemainingTime());
    const interval = setInterval(
      () => setRemainingTime(calculateRemainingTime()),
      1000
    );
    return () => clearInterval(interval);
  }, [event]);

  return (
    <li
      className={styles.timerItem}
      style={{ backgroundSize: `${getProgressPercent(event)}% 100%` }}
    >
      <div className={styles.info}>
        <p className={styles.name}>{event.name}</p>
        <p className={styles.dateTime}>
          {event.date} {event.time}
        </p>
        <p className={styles.remainingTime}>{remainingTime}</p>
      </div>
      <button className={styles.delBtn} onClick={() => onDelete(event.id)}>
        X
      </button>
    </li>
  );
};

export default EventTimer;
