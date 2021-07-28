import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from "../../../../store/fuse/messageSlice";

export const getMiTarea = createAsyncThunk('miTareaApp/miTarea/getMiTareasData', async (params) => {
	const response = await axios.get(process.env.REACT_APP_API+'/tarea/'+params.id);
    const data = await response.data;
				
	return data;
});

export const submitUploadFile = ( params, data, file, fileType ) => async dispatch => {
	
	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

    return jwtService
		.updateDelivery({
            id: params.id,
			filePath: fileType == 'file' ? data.file_path ? data.file_path : '' : '',
			urlPath: fileType == 'url' ? data.url_path : '',
			file: fileType == 'file' ? file : null,
			deliveryDate: date,
		})
		.then(delivery => {
			dispatch(getMiTarea(params));
			dispatch(showMessage({message: 'Tarea enviada',variant: 'success'	}));
		})
		.catch(error => {
			dispatch(showMessage({message: 'No se pudo entregar la tarea', variant: 'error'}));
		});

};

const miTareaSlice = createSlice({
	name: 'miTareaApp/miTarea',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getMiTarea.fulfilled]: (state, action) => action.payload
	}
});

export default miTareaSlice.reducer;