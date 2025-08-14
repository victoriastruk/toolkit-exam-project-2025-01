import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, deleteEvent } from '../../store/slices/eventsSlice';
import EventTimer from '../EventTimer/EventTimer';
import { getProgressPercent } from '../../utils/progressPercent';
import SpinnerLoader from '../Spinner/Spinner';
import CONSTANTS from '../../constants';

import styles from './EventList.module.sass';

const EventList = () => {
  const { events, isFetching, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className={styles.timersWrapper}>
      {isFetching ? (
        <SpinnerLoader />
      ) : error ? (
        <p>Error: {error.data}</p>
      ) : events.length === 0 ? (
        <p className={styles.noEvents}>No events</p>
      ) : (
        <>
          <div className={styles.title}>
            <h2>Live upcoming checks</h2>
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
        </>
      )}
    </div>
  );
};

export default EventList;
