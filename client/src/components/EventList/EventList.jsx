import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent } from '../../store/slices/eventsSlice';
import EventTimer from '../EventTimer/EventTimer';
import CONSTANTS from '../../constants';

import styles from './EventList.module.sass';

const EventList = () => {
  const dispatch = useDispatch();
  const { events, isFetching } = useSelector((state) => state.events);

  const getProgressPercent = (event) => {
    const now = Date.now();
    const eventTimeMs = new Date(`${event.date}T${event.time}`).getTime();
    const createdAtMs = event.id;

    const totalMs = Math.max(1, eventTimeMs - createdAtMs);
    const elapsedMs = now - createdAtMs;

    const percent = 100 - (elapsedMs / totalMs) * 100;
    return Math.max(0, Math.min(100, percent));
  };

  if (isFetching) {
    return <p>Loading events...</p>;
  }

  if (events.length === 0) {
    return <p>No events</p>;
  }
  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };
  return (
    <div className={styles.timersWrapper}>
      <div className={styles.title}>
        <h2>Live upcomming checks</h2>
        <p>
          Remaining time{' '}
          <img
            className={styles.img}
            alt="timer"
            src={`${CONSTANTS.STATIC_IMAGES_PATH}timer.png`}
          />
        </p>
      </div>
      <ul className={styles.timerList}>
        {events.map((event) => (
          <EventTimer
            key={event.id}
            event={event}
            onDelete={handleDeleteEvent}
            getProgressPercent={getProgressPercent}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
