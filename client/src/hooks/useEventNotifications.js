import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent } from '../store/slices/eventsSlice';

export const useEventNotifications = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const timersRef = useRef([]);

  useEffect(() => {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];

    events.forEach((event) => {
      if (event.notified) return;

      const interval = setInterval(() => {
        const eventTime = new Date(`${event.date}T${event.time}`);
        const now = new Date();
        const notifyTime = eventTime - event.notifyBefore * 60 * 1000;

        if (now >= notifyTime && !event.notified) {
          dispatch(updateEvent({ ...event, notified: true }));
        }

        if (eventTime <= now) {
          clearInterval(interval);
        }
      }, 1000);

      timersRef.current.push(interval);
    });

    return () => {
      timersRef.current.forEach(clearInterval);
    };
  }, [events, dispatch]);
};
