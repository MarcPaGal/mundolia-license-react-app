import { combineReducers } from '@reduxjs/toolkit';
import group from './groupSlice';
import teachers from './teacherSlice';
import token from './tokenSlice';

const reducer = combineReducers({
    group,
	teachers,
    token
});

export default reducer;
