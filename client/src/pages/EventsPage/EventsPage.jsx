import { useEventNotifications } from '../../hooks/useEventNotifications';
import EventForm from '../../components/EventForm/EventForm';
import EventList from '../../components/EventList/EventList';

import styles from './EventsPage.module.sass';

const EventsPage = () => {
  useEventNotifications();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Events</h1>
      <EventForm />
      <EventList />
    </div>
  );
};

export default EventsPage;
