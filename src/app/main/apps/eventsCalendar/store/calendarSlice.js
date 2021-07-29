import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getCalendars = createAsyncThunk('calendarApp/calendars/getCalendars', async (params) => {
	const response = await axios.get(process.env.REACT_APP_API+'/google/calendars', {
        params: {
            group_id: params.group_id
        }
    });
	const data = await response.data;
	return data;
});

export const getGroups = createAsyncThunk('calendarApp/calendars/getGroups', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/grupos');
	const data = await response.data;
	return data;
});

export const getSubjects = createAsyncThunk('calendarApp/calendars/getSubjects', async (params) => {
	const response = await axios.get(process.env.REACT_APP_API+'/google/calendars/subjects/'+params.group_id,{
		// params:filterContacts
	});
	console.log(response.data);
	const data = response.data;
	return data;
});

export const submitCreateCalendar = ( subjectData, group ) => async dispatch => {
	return jwtService
		.addCalendar({
			subject_id: subjectData.subject_id
		})
		.then(calendar => {
			dispatch(registerSuccess());
            dispatch(getCalendars({group_id: group}));
			dispatch(getSubjects({group_id: group}));
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			return dispatch(registerError(error));
		});
};

const calendarsAdapter = createEntityAdapter({});

export const { 
        selectAll: selectCalendars
    } = calendarsAdapter.getSelectors(state => state.calendarApp.calendars);

const calendarSlice = createSlice({
	name: 'calendarApp/calendars',
	initialState: calendarsAdapter.getInitialState({
        calendarDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
        data: {

        },
        calendar: {
			success: false,
			response: false,
			error: null
		},
        subjects: {
			success: false,
			response: false,
			data: {
				calendars: null,
				nonCalendars: null
			}
		},
		groups: [],
		group: 0,
    }),
	reducers: {
        openCalendarDialog: (state, action) => {
            state.calendarDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeCalendarDialog: (state, action) => {
            state.calendarDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
        registerSuccess: (state, action) => {
			state.calendar = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.calendar = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.calendar = {
				success: false,
				error: null,
			};	
		},
		setGroup: (state, action) => {
			state.group = {
				group: action.payload,
			};
		} 
    },
	extraReducers: {
		// [getCalendars.fulfilled]: (state, action) => action.payload
        [getSubjects.fulfilled]: (state, action) => { state.subjects = action.payload },
		[getGroups.fulfilled]: (state, action) => { state.groups = action.payload },
        [getCalendars.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.data = data;
		},
	}
});

export const {
	openCalendarDialog,
    closeCalendarDialog,
    registerSuccess,
	registerError,
	registerReset,
	setGroup,
} = calendarSlice.actions;

export default calendarSlice.reducer;