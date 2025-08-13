import React, { useEffect, useState } from 'react';
import styles from './EventTimer.module.sass';

const EventTimer = ({ event, onDelete, getProgressPercent }) => {
  const [remainingTime, setRemainingTime] = useState('');

  const formatRemainingTime = () => {
    const now = Date.now();
    const eventTimeMs = new Date(`${event.date}T${event.time}`).getTime();
    const diffMs = eventTimeMs - now;

    if (diffMs <= 0) return "Time's up!";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    let parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(' ');
  };

  useEffect(() => {
    setRemainingTime(formatRemainingTime());
    const interval = setInterval(() => {
      setRemainingTime(formatRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  return (
    <li
      key={event.id}
      className={styles.timerItem}
      style={{
        backgroundSize: `${getProgressPercent(event)}% 100%`,
      }}
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
