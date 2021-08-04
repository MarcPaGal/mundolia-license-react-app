import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getTareasCalificadas = createAsyncThunk('PreescolarApp/tareas/getTareasCalificadas', async (role, { getState }) => {

    // let filterContacts = getState().ActivitiesApp.filter.activity;

    const today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + today.getMinutes();

    let params = {
        status: 'Calificado',
        today: date,
    };

    const response = await axios.get(process.env.REACT_APP_API + '/tareas', {
        params: params
    });
    const data = await response.data;
    return data;


});


const tareasCalificadasAdapter = createEntityAdapter({});

const tareasCalificadasSlice = createSlice({
	name: 'PreescolarApp/tareas',
    initialState: {},
	reducers: {},
	extraReducers: {
        [getTareasCalificadas.fulfilled]: (state, action) => action.payload
    }
});

export default tareasCalificadasSlice.reducer;
