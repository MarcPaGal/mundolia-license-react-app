import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getHomeworks = createAsyncThunk('homeworksApp/homeworks/getHomeworks', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/grupos',{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});

export const submitCreateHomework = ( homeworkdata ) => async dispatch => {
	return jwtService
		.addHomework({
			// homeworkId: homeworkdata.homeworkList,
			// uuids: users,
			homeworkName: homeworkdata.name,
			teacherId: homeworkdata.teacher.id,
			schoolId: homeworkdata.teacher.school_id,
			grade: homeworkdata.grade,
		})
		.then(homework => {
			dispatch(registerSuccess());
			dispatch(getHomeworks());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitUpdateHomework = ( homeworkdata, homeworkOrigin ) => async dispatch => {
	return jwtService
		.updateHomework({
			homeworkId: homeworkOrigin.id,
			homeworkTitle: homeworkdata.name,
			teacherId: homeworkdata.teacher.id,
		})
		.then(homework => {
			dispatch(registerSuccess());
			dispatch(getHomeworks());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};
export const removeHomework = createAsyncThunk('homeworksApp/homeworks/removeHomework', async (id, { dispatch, getState }) => {
		try {
			await axios.delete(process.env.REACT_APP_API+'/grupos/'+id).then(response => {
				const data = response.data.data;
				dispatch(showMessage({message: response.data.message, variant: 'success'}));
				dispatch(getHomeworks());
				return data;
			}).catch(error => {
				dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

const homeworksAdapter = createEntityAdapter({});

export const { selectAll: selectHomeworks, selectById: selectHomeworksById } = homeworksAdapter.getSelectors(
	state => state.HomeworksApp.homework
);
const homeworkSlice = createSlice({
	name: 'homeworksApp/homeworks',
	initialState: homeworksAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		homeworkDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		homework: {
			success: false,
			response: false,
			error: null
		}
	}),
	reducers: {
		setHomeworksSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditHomeworkDialog: (state, action) => {
			console.log('opeeeeeeeeeeeeen');
			state.homeworkDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.homework = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.homework = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.homework = {
				success: false,
				error: null,
			};	
		},
	},
	extraReducers: {
		// [updateContact.fulfilled]: homeworksAdapter.upsertOne,
		// [addContact.fulfilled]: homeworksAdapter.addOne,
		[getHomeworks.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			homeworksAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setHomeworksSearchText,
	openNewHomeworkDialog,
	closeNewHomeworkDialog,
	registerSuccess,
	registerError,
	registerReset,
	openEditHomeworkDialog,
	closeEditHomeworkDialog,
} = homeworkSlice.actions;


export default homeworkSlice.reducer;