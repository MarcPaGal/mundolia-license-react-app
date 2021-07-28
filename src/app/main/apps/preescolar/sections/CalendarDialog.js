import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { showMessage } from "../../../store/fuse/messageSlice";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextFieldFormsy } from "../../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
// import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
// import { getSubjects } from './store/subjectSlice';
import { closeCalendarDialog } from '../store/calendarSlice';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

const defaultFormState = {
	id: '',
	name: '',
	group_id: '',
	finish_date: '',
	groupList: '',
	theme: '',
	instructions: '',
	is_active: true,
	file_path: '',
	url_path: '',
};

const useStyles = makeStyles(theme => ({
	palette: {
		background: {
		  default: 'transparent'
		}
	
		},
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	Text: {
		fontSize: "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextCalendar: {
		fontSize: "13px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextInfo: {
		fontSize: "16px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	button: {

		"&:hover": {
			transform: "scale(1.2)"
			// width:"120%"
		},
		text: "center",
	},
	img: {
		maxHeight: "20%",
		maxWidth: "20%",
	},
	container: {
		// marginTop: "20px",
		// paddingTop: "20px",
		// height: "90px",
		
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		
		
	},
	paperTitle: {
		// marginTop: "-20px",
		paddingTop: "30px",
		height: "85px",
		paddingLeft: "40px",
		paddingRight: "40px",
		// width: "280px",
		// justifyContent: "center",
		alignSelf: "center",
		textAlign: "center", //*important
	},
	paperCalendar: {
		marginTop: "-40px",
		paddingTop: "20px",
		height: "200px",
		width: "200px",
		textAlign: "center", //*important
	},
	scroll: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 520,
		height: 520,
		border: 1
	},
	scrollCalendar: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 390,
		height: 400,
		border: 1, 
		paddingBottom: 15
	},
	containersInfo: {
		borderRadius: 5,
		width: '50px'
	},
	avatarContainer: {
		// objectPosition: 'right',
		// display: 'flex',
		// flexDirection: "row-reverse"
		// maxHeight: '40px',
		// justifyContent: "flex-end",
		// alignItems: "flex-end",
		// alignContent: "flex-end",
		// textAlign:"right",
		// alignSelf: 'flex-end',
		// alignContent: 'flex-end',
		// flexContainer: 'justify-end',
		paddingLeft: '70px',
		paddingRight: '70px',
	},
	userIcon:{
		// maxHeight: "50%",
		// maxWidth: "50%",
		// display: 'flex',
		// objectFit: 'cover',
		// flexContainer: 'justify-end',
		// justifyContent: "flex-end",
		// alignItems: "flex-end",
		// alignContent: "flex-end",
		// textAlign:"right",
		// alignSelf: 'flex-end',
		// alignContent: 'flex-end',
		paddingLeft: '100px'

	},
	infoCardsColumn: {
		paddingTop: 12, paddingBottom: 12, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ECA800', color: '#FFFFFF',												
		borderRadius: 15, fontWeight: "bold", width: 'full', height: 'full', textAlign: "center", flex: 1, borderColor: '#FFD90A', borderWidth: 6,
		

	},
	calendarPoints: {
		paddingLeft: 5, paddingRight: 5, color: '#FFFFFF',												
		borderRadius: 15, fontWeight: "bold", textAlign: "center", borderColor: '#FFD90A', borderWidth: 4,
		
	},
	TextDaysCalendar: {
		fontSize: "14px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},

}));

const LightTooltip = withStyles((theme) => ({
	tooltip: {
	  backgroundColor: theme.palette.common.white,
	  color: 'rgba(0, 0, 0, 0.87)',
	  boxShadow: theme.shadows[1],
	  fontSize: 16,
	},
  }))(Tooltip);

function CalendarDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const calendarDialog = useSelector(({ PreescolarApp }) => PreescolarApp.calendar.calendarDialog);
	const formOrigin = useSelector(({ PreescolarApp }) => PreescolarApp.calendar.calendarDialog.data);
	const role = useSelector(({ auth }) => auth.user.role);
	const { form, handleChange, setForm} = useForm(defaultFormState);
	const info = useSelector(({ auth }) => auth.user);
	const escuelabaja = role== 'alumno' && info.grade <= 3 ? true : false ; 

	const [values, setValues] = React.useState({
		// showPassword: false,
		loading : false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	// const [showPassword, setShowPassword] = useState(false);
	const formRef = useRef(null);


	const initDialog = useCallback(() => {
		// /**
		//  * Dialog type: 'edit'
		//  */
		// if ((homeworkDialog.type === 'edit')&& homeworkDialog.data) {
			setForm({ ...calendarDialog.data });
		// }

	}, [calendarDialog.data, calendarDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (calendarDialog.props.open) {
			initDialog();
		}
	}, [calendarDialog.props.open, initDialog]);


    
	function closeComposeDialog() {
        return ( dispatch(closeCalendarDialog()) );
        // return  dispatch(closeNewHomeworkDialog());
	}

	return (
		<Dialog
			classes={{
				paper: 'rounded-20',
			}}
			{...calendarDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
			style={{
				
				backgroundColor: 'transparent',
				color: 'transparent',
				boxShadow: 'none',
			}}
		>
		<Paper 
		className={clsx(classes.container), "w-full rounded-12 items-center justify-center items-center"}
		// elevation={3}
		backgroundColor="transparent"
		color="transparent"

		style={{
			backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent',
		}}
		>
			<div 
			className={clsx(classes.paperTitle)}
			position='absolute'
			style={{
				backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
				backgroundPosition: 'center',
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat',
				backgroundColor: 'transparent',
				boxShadow: 'none',
				color: 'transparent',
				marginColor:'transparent'
			}}

			
			>
				
					<Typography className={clsx(classes.Text)}>
						{ escuelabaja ? 'Calendario Semanal de Tareas' : 'Calendario Semanal de Actividades' }
						{/* Calendario Semanal Nuevas Tareas */}
					</Typography>
			</div>
		
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scrollCalendar} >
						
							<div className="flex flex-row flex-wrap relative overflow-hidden">
											
								<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1">
									<Typography className={clsx(classes.TextDaysCalendar)}>
										Lunes
									</Typography>
								</div>
								<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
									<Typography className={clsx(classes.TextDaysCalendar)}>
										Martes
									</Typography>
								</div>
								<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
									<Typography className={clsx(classes.TextDaysCalendar)}>
										Miercoles
									</Typography>
								</div>
								<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
									<Typography className={clsx(classes.TextDaysCalendar)}>
										Jueves
									</Typography>
								</div>
								<div className=" flex w-1/5 p-3 text-center items-center justify-center border-l-1">
									<Typography className={clsx(classes.TextDaysCalendar)}>
										Viernes
									</Typography>
								</div>
												
								

							{formOrigin &&
							formOrigin.map(row => (
								< div className=" flex w-1/5 p-3 text-center items-center justify-center flex-col h-full">

									{ row && row.dayActivities.length > 0 ?
										<>
											{ row.dayActivities && row.dayActivities.map(rows => (

											<LightTooltip title={rows.custom_name} placement="top">
												<p className={clsx(classes.calendarPoints)}
													style={{
														backgroundColor: rows.custom_color,
													}}>

													<Typography className={clsx(classes.TextDaysCalendar)}>
														{rows.total}
													</Typography>
												</p>
											</LightTooltip>
											))}

										</>
										:
										null

									}
								</div>
							))
						}
					</div>
						</List>
			</Paper>
		</Dialog>
	);
}

export default CalendarDialog;