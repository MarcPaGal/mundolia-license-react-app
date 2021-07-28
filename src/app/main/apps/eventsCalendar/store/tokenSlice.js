import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getToken = createAsyncThunk('calendarApp/token/getToken', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/google/token');
	const data = await response.data;
	return data;
});

const tokenAdapter = createEntityAdapter({});

export const { selectAll: selectToken } = tokenAdapter.getSelectors(
	state => state.calendarApp.token
);

const tokenSlice = createSlice({
	name: 'calendarApp/token',
	initialState: tokenAdapter.getInitialState({
        tokenDialog: {
			type: 'google',
			props: {
				open: false
			},
			data: null
		},
        token: ''
    }),
    reducers: {
        openTokenDialog: (state, action) => {
            state.tokenDialog = {
                type: 'google',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeTokenDialog: (state, action) => {
            state.tokenDialog = {
                type: 'google',
                props: {
                    open: false
                },
                data: null
            };
        },
    },
	extraReducers: {
		[getToken.fulfilled]: (state, action) => {
            const { data } = action.payload;
			state.token = data;
        }
	}
});

export const {
	openTokenDialog,
    closeTokenDialog
} = tokenSlice.actions;

export default tokenSlice.reducer;