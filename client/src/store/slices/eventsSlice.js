import { createSlice } from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';
import { loadEvents, saveEvents } from '../../utils/storage';
import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
  createExtraReducers,
} from '../../utils/store';

const sortEvents = (events) =>
  orderBy(events, (e) => `${e.date}T${e.time}`, ['asc']);
const calculateBadgeCount = (events) => events.filter((e) => e.notified).length;

const initialEvents = sortEvents(loadEvents());
const initialState = {
  events: initialEvents,
  badgeCount: calculateBadgeCount(initialEvents),
  isFetching: false,
  error: null,
};

export const fetchEvents = decorateAsyncThunk({
  key: 'events/getEvents',
  thunk: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return loadEvents();
  },
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, { payload }) => {
      state.events.push(payload);
      state.events = sortEvents(state.events);
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
  extraReducers: createExtraReducers({
    thunk: fetchEvents,
    pendingReducer,
    fulfilledReducer: (state, action) => {
      state.events = sortEvents(action.payload);
      state.badgeCount = calculateBadgeCount(action.payload);
      saveEvents(action.payload);
      state.isFetching = false;
    },
    rejectedReducer,
  }),
});

const { actions, reducer } = eventsSlice;

export const { addEvent, updateEvent, deleteEvent } = actions;

export default reducer;
