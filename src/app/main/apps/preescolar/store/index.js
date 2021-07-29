import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';
import panel from './panelSlice';
import calendar from './calendarSlice';
import miTarea from './miTarea';
import subjectCalendarSlice from "./subjectCalendarSlice";

const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
	panel,
	calendar,
	miTarea,
	subjectCalendarSlice,
});

export default reducer;
