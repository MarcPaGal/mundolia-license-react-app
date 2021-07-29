import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getStudentCalendars = createAsyncThunk('calendarApp/calendars/getStudentCalendars', async (params) => {
    const response = await axios.get(process.env.REACT_APP_API+'/google/calendars/alumno', {
    });
    const data = await response.data;
    return data;
});

export const getStudentSubjects = createAsyncThunk('calendarApp/calendars/getStudentSubjects', async (params) => {
    const response = await axios.get(process.env.REACT_APP_API+'/calendar/student/subjects',{
    });
    console.log(response);
    const data = response.data;
    return data;
});

const calendarsAdapter = createEntityAdapter({});

export const {
    selectAll: selectCalendars
} = calendarsAdapter.getSelectors(state => state.subjectCalendar.alumno);

const subjectCalendaSlice = createSlice({
    name: 'subjectCalendar/alumno',
    initialState: calendarsAdapter.getInitialState({
        calendar: {
            success: false,
            response: false,
            error: null
        },
        subjects: {
            success: false,
            response: false,
            data: {
            }
        },
        groups: [],
        group: 0,
    }),
    reducers: {},
    extraReducers: {
        [getStudentCalendars.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.data = data;
        },
        [getStudentSubjects.fulfilled]: (state, action) => {
            console.log(state);
            state.subjects = action.payload
        },

    }
});

export default subjectCalendaSlice.reducer;