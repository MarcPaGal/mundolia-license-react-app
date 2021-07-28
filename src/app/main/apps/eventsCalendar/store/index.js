import { combineReducers } from '@reduxjs/toolkit';
import calendar from './calendarSlice';
import token from './tokenSlice';
import event from './eventsSlice';

const reducer = combineReducers({
    calendar,
    event,
    token
});

export default reducer;