import React, { useRef, useEffect } from 'react';
import { useForm } from '@fuse/hooks';
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCalendars, getSubjects, setGroup } from './store/calendarSlice';

const useStyles = makeStyles(theme => ({
	formControl:{
		width:'95%',
		margin: 5,
		height:53, 
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
	}
}));

const defaultFormState = {
	group_id: 0,
};

function EventsCalendarHeader(props) {

	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	const classes = useStyles(props);
	const routeParams = useParams();
	const {form, setForm, handleChange} = useForm(defaultFormState);

	const groups = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.groups.data);

	useEffect(() => {
        dispatch(getCalendars(form));
        dispatch(getSubjects(form));
		dispatch(setGroup(form.group_id));
	}, [dispatch, form]);

	return (
		<>

					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="group_id">Grupo</InputLabel>
						<Select
							labelId="group_id"
							id="group_id"
							name="group_id"
							width="100%"
							value={form.group_id}
							onChange={handleChange}
							label="Grupos"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
						>
                            <MenuItem key={0} value={0}>No seleccionado</MenuItem>
							{groups ? groups.map((row) => (
								<MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
							)): null}
						</Select>
					</FormControl>
				
		</>
	);
}

export default EventsCalendarHeader;