export const loadEvents = () => {
  try {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load events from localStorage', e);
    return [];
  }
};

export const saveEvents = (events) => {
  localStorage.setItem('events', JSON.stringify(events));
};
