import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from "@ericz1803/react-google-calendar";
import { openCalendarDialog } from './store/calendarSlice';
import EventsCalendarDialog from './EventsCalendarDialog';
import EventsCalendarEventDialog from './EventCalendarEventDialog';
import Typography from '@material-ui/core/Typography';
import { openEventDialog } from './store/eventsSlice';

const useStyles = makeStyles({
	addCalendar: {
		position: 'fixed',
		right: 12,
		bottom: 15,
		zIndex: 99
	},
	addEvent: {
		position: 'fixed',
		right: 80,
		bottom: 15,
		zIndex: 99
	}
});

function EventsCalendarContent(props) {

	// let calendarsIds = [
	// 	{calendarId: "cr7v50c3mikurhfr73oqa3qcbk@group.calendar.google.com"},
	// 	{calendarId: "62llaglq7i0b3jkp3t402rfosg@group.calendar.google.com", color: "#8fb4d1"}, //accepts hex and rgb strings (doesn't work with color names)
	// 	{calendarId: "vk8dl7jod7qq9s44paa48eqq20@group.calendar.google.com", color: "#8fb4d1"} //accepts hex and rgb strings (doesn't work with color names)		
	// ];

	const [calendarsIds, setCalendars] = useState([]);

	const dispatch = useDispatch();
	const classes = useStyles(props);
	const calendars = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.data);
	const subjects = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.subjects.data.calendars);

	useEffect(() => {
		let calendarsArray = [];

		for (let i in calendars) {
			calendarsArray.push({ calendarId: calendars[i].calendar_id, color: calendars[i].custom_color });
			console.log(calendarsArray);
		}
		setCalendars(calendarsArray);
	}, [dispatch, calendars, subjects]);

	let styles = {
		//you can use object styles (no import required)
		calendar: {
			borderWidth: "3px", //make outer edge of calendar thicker
		},

		//you can also use emotion's string styles
		today: {
			border: "1px solid red",
			backgroundColor: "#ffeceb",
		}
	}

	return (
		<>
			{
				calendarsIds.length ?
					<div
						className="w-full item-center p-20"
						style={{
							color: 'white'
						}}
					>
						<Typography color="textSecondary" className="text-24">
							Materias
						</Typography>
						<div
							className="flex flex-row w-full mb-20"
							style={{
								padding: 10,
								overflowX: 'auto',
								whiteSpace: "nowrap"
							}}
						>

							{subjects.map((subject) => (
								<div
									style={{
										margin: 5,
										padding: 10,
										backgroundColor: subject.custom_color,
										borderRadius: 5,
									}}
								>
									<Typography
										className="text-16"
										style={{
											color: 'white'
										}}
									>
											{subject.custom_name}
									</Typography>
								</div>
							))}
						</div>

						<div
							style={{
								padding: "2%",
								backgroundColor: 'white'
							}}>
							<Calendar apiKey={process.env.REACT_APP_CALENDAR_KEY} calendars={calendarsIds} styles={styles} language={'ES'} />
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Fab
									color="primary"
									aria-label="add"
									className={classes.addEvent}
									onClick={ev => dispatch(openEventDialog())}
									>
									<Icon>add_to_photos</Icon>
								</Fab>
							</FuseAnimate>
						</div>
					</div>
					:
					<div className="flex flex-1 items-center justify-center">
								<Typography color="textSecondary" className="text-24 my-24">
									No se encontraron calendarios!
								</Typography>
							</div>
			}
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addCalendar}
					onClick={ev => dispatch(openCalendarDialog())}
				>
					<Icon>event</Icon>
				</Fab>
			</FuseAnimate>
			<EventsCalendarEventDialog/>
			<EventsCalendarDialog/>
		</>
	);
}
export default EventsCalendarContent;