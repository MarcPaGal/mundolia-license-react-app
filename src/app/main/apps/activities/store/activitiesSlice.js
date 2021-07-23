import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getActivities = createAsyncThunk('activitiesApp/activities/getActivities', async ( role, { getState }) => {
	
	let filterContacts = getState().ActivitiesApp.filter.activity;

	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + today.getMinutes();

	let params = {
		group_id: filterContacts.group_id == 0 ? null : filterContacts.group_id,
		is_active: filterContacts.active ? filterContacts.active == 2 ? 0 : 1 : null,
		orderDate: filterContacts.date,
		today: date,
		status: filterContacts.status ? filterContacts.status : null,
	};
	
	if (role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' || role == 'alumnoe1' || role == 'alumnoe2' || role == 'alumnoe3' || role == 'Alumno-I' || role == 'Alumno-M' || role == 'Alumno-A' ) {
		const response = await axios.get(process.env.REACT_APP_API + '/tareas', {
			params: params
		});
		const data = await response.data;
		return data;
	}
	else {
		const response = await axios.get(process.env.REACT_APP_API + '/actividades', {
			params: params
		});
		const data = await response.data;
		return data;
	}
	
});

export const getSubjects = createAsyncThunk('activitiesApp/subjects/getSubject', async (id) => {
	const response = await axios.get(process.env.REACT_APP_API+'/materias/grupo/'+id,{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});

export const submitCreateActivity = ( activityData, file, fileType ) => async dispatch => {
	return jwtService
		.addActivity({
	        name: activityData.name,
            groupId: activityData.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
			theme: activityData.theme,
			instructions: activityData.instructions,
			is_active: activityData.is_active ? 1 : 0,
			urlPath: fileType == 'url' ? activityData.url_path : '',
			files: fileType == 'file' ? file : null,
			subject_id: activityData.subject_id
		})
		.then(activity => {
			dispatch(registerSuccess());
			dispatch(getActivities());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitUpdateActivity = ( activityData, activityDataOrigin, file, fileType ) => async dispatch => {
	return jwtService
		.updateActivity({
            activityId:activityDataOrigin.id,
			name: activityData.name,
            groupId: activityDataOrigin.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
			theme: activityData.theme,
			instructions: activityData.instructions,
			is_active: activityData.is_active ? 1 : 0,
			filePath: fileType == 'file' ? activityDataOrigin.file_path ? activityDataOrigin.file_path : '' : '',
			urlPath: fileType == 'url' ? activityData.url_path : '',
			files: fileType == 'file' ? file : null,
			subject_id: activityDataOrigin.subject_id
		})
		.then(activity => {
			dispatch(registerSuccess());
			dispatch(getActivities());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});

};

export const removeActivity = createAsyncThunk(
	'activitiesApp/activities/removeActivity',
	async (id, { dispatch, getState }) => {
		try {
			await axios.delete(process.env.REACT_APP_API+'/actividades/'+id).then(response => {
                console.log(response);
				const data = response.data;
				dispatch(showMessage({message: response.data.message, variant: 'success'}));
				dispatch(getActivities());
				return data;
			}).catch(error => {
				dispatch(showMessage({message: error.response.data.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

export const removeFile = (name, file) => async dispatch => {
	try {
		await axios.delete(process.env.REACT_APP_API+'/remove-file/'+name+'/'+file).then(response => {
			const data = response.data;
			dispatch(showMessage({message: response.data.message, variant: 'success'}));
			dispatch(getActivities());
			return data;
		}).catch(error => {
			dispatch(showMessage({message: error.response.data.message, variant: 'error'}));
		});
	}catch (e){
		console.log(e);
	}
};

export const downloadActivity = ( filename ) => async dispatch => {
	
	axios({
		url: process.env.REACT_APP_API+'/download-file',
		method: 'POST',
		responseType: 'blob', // important
		data: {
			filename:filename
		}
	})
	.then( response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename.slice(filename.indexOf('_')+1 )); //or any other extension
		document.body.appendChild(link);
		link.click();
	}).catch(error => {
		dispatch(showMessage({message: "Error al descargar el archivo", variant: 'error'}));
	})
};

const activitiesAdapter = createEntityAdapter({});

export const { selectAll: selectActivities, selectById: selectActivityById } = activitiesAdapter.getSelectors(
	state => state.ActivitiesApp.activities
);

const activitiesSlice = createSlice({
	name: 'activitiesApp/activities',
    initialState: activitiesAdapter.getInitialState({
        activityDialog : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        activity: {
			success: false,
			response: false,
			error: null
		},
		routeParams: {},
		subjects: {
			data: []
		}
    }),
    reducers: {
        openNewActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeNewActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
		openEditActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'edit',
                props: {
                    open: true
                },
                data: action.payload
            };
        },
        closeEditActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'edit',
                props: {
                    open: false
                },
                data: null
            };
        },
        registerSuccess: (state, action) => {
			state.activity = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.activity = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.activity = {
				success: false,
				error: null,
			};	
		},
    },
	extraReducers: {
		[getSubjects.fulfilled]: (state, action) => {state. subjects = action.payload},
        [getActivities.fulfilled]: (state, action) => {
            const { data, routeParams } = action.payload;
			activitiesAdapter.setAll(state, data);
			state.routeParams = routeParams;
        }
    }
});

export const {
	openNewActivityDialog,
    closeNewActivityDialog,
	openEditActivityDialog,
	closeEditActivityDialog,
    registerError,
    registerSuccess,
    registerReset,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
