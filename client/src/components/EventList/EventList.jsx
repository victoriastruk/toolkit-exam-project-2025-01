import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent } from '../../store/slices/eventsSlice';

const EventList = () => {
  const dispatch = useDispatch();
  const { events, isFetching } = useSelector((state) => state.events);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };

  const formatRemainingTime = (event) => {
    const eventTime = new Date(`${event.date}T${event.time}`);
    const diffMs = eventTime - now;

    if (diffMs <= 0) return `Time's up!`;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (isFetching) {
    return <p>Loading events...</p>;
  }

  if (events.length === 0) {
    return <p>No events</p>;
  }
  return (
    <div>
      <h2>Live upcomming checks</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div>
              <p>{event.name}</p>
              <p>
                {event.date} {event.time}
              </p>
              <p>{formatRemainingTime(event)}</p>
            </div>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
