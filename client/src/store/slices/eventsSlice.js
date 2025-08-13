import { createSlice } from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';

const loadEvents = () => {
  try {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load events from localStorage', e);
    return [];
  }
};
const sortEvents = (events) =>
  orderBy(events, (e) => `${e.date}T${e.time}`, ['asc']);
const calculateBadgeCount = (events) => events.filter((e) => e.notified).length;
const initialEvents = sortEvents(loadEvents());
const initialState = {
  events: initialEvents,
  badgeCount: calculateBadgeCount(initialEvents),
  isFetching: false,
};

const saveEvents = (events) => {
  localStorage.setItem('events', JSON.stringify(events));
};



const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    //  fetchEventsStart: (state) => {
    //    state.isFetching = true;
    //  },
    //  fetchEventsSuccess: (state, { payload }) => {
    //    state.events = sortEvents(payload);
    //    state.badgeCount = calculateBadgeCount(state.events);
    //    state.isFetching = false;
    //    saveEvents(state.events);
    //  },
    //  fetchEventsFailure: (state) => {
    //    state.isFetching = false;
    //  },
    addEvent: (state, { payload }) => {
      state.events.push(payload);
      state.events = sortEvents(state.events);
      state.badgeCount = calculateBadgeCount(state.events);
      saveEvents(state.events);
    },
    setEvents: (state, { payload }) => {
      state.events = sortEvents(payload);
      state.badgeCount = calculateBadgeCount(state.events);
      saveEvents(state.events);
    },
    updateEvent: (state, { payload }) => {
      state.events = state.events.map((e) =>
        e.id === payload.id ? { ...e, ...payload } : e
      );
      state.badgeCount = calculateBadgeCount(state.events);
      saveEvents(state.events);
    },
    deleteEvent: (state, { payload }) => {
      state.events = state.events.filter((e) => e.id !== payload);
      state.badgeCount = calculateBadgeCount(state.events);
      saveEvents(state.events);
    },
  },
});

const { actions, reducer } = eventsSlice;

export const { addEvent, setEvents, updateEvent, deleteEvent } = actions;

export default reducer;
