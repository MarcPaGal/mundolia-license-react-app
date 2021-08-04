import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {getStudentCalendars, getStudentSubjects} from '../store/subjectCalendarSlice';
import { Calendar,momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { getEvents } from './Fetch';
import {CircularProgress} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from '@material-ui/core/Tooltip';
import parse from 'html-react-parser';
import UserInfoHeader from "../components/UserInfoHeader";
import LogoutButton from '../components/LogoutButton';

const formats = {
    eventTimeRangeFormat: () => {
        return "";
    },
};

const localizer = momentLocalizer(moment);

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const CustomEvent = ({ event }) => {
    moment.locale('es-MX');
    var dateString = String(moment(event.start.toString()).format('dddd, Do MMMM hh:mm ') + '-' + moment(event.end.toString()).format('hh:mm a')).charAt(0).toUpperCase() + String(moment(event.start.toString()).format('dddd, Do MMMM h:mm ') + '-' + moment(event.end.toString()).format('hh:mm a')).slice(1);
    return (
        <>
            <HtmlTooltip interactive
                title={
                    <React.Fragment>
                        <div>{event.title}</div><br></br>
                        <div>{dateString}</div><br></br>
                        {parse(event.description.toString())}
                    </React.Fragment>
                }
            >
                <strong> {event.title} </strong>
            </HtmlTooltip>
        </>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .rbc-toolbar': {
            padding: '12px 6px',
            fontWeight: 600,
            fontSize: 14,
            backgroundColor: '#ffffff',
        },
        '& .rbc-label': {
            padding: '8px 6px'
        },
        '& .rbc-today': {
            backgroundColor: '#ffffff'
        },
        '& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
            borderBottom: `2px solid ${theme.palette.secondary.main}!important`
        },
        '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
            padding: 24,
            backgroundColor: '#ffffff',
            [theme.breakpoints.down('sm')]: {
                padding: 10
            },
            ...theme.mixins.border(0)
        },
    },
    addButton: {
        position: 'absolute',
        right: 12,
        top: 172,
        zIndex: 99
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: "rgb(255, 255, 255, 0.1)",
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 460,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 460,
    },
    paperNav: {
        padding: theme.spacing(1),
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 460,
        position: 'relative',
        maxHeight: 460,
    },
    TextTitle: {
        // fontWeight: "bold",
        fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "42px" : "32px",
        color: 'white',
        textShadow: '2px 2px 2px black',
        textTransform:"capitalize",
        marginLeft: 25
    },
    Text: {
        fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "26px" : "16px",
        color: 'white',
        textShadow: '2px 2px 2px black',
        text: "center",
        alignSelf: "center",
        textTransform: "capitalize"
    },
    TextInfo: {
        fontSize: "16px",
        color: 'white',
        textShadow: '2px 2px 2px black',
        text: "center",
        alignSelf: "center",
    },
    containerClass:{
      padding:'4rem'
    },
    button: {

        "&:hover": {
            transform: "scale(1.2)"
            // width:"120%"
        },
        text: "center",
    },
    buttonClass: {
        width:'auto',
        "&:hover": {
            backgroundColor: '#6f51ed',
            transform: "scale(1.1)"
            // width:"120%"
        },
        minWidth:'48px',
        height:'48px',
        minHeight: 'auto',
        padding: ' 0 16px',
        borderRadius: '24px',
        margin: '10px',
        backgroundColor:'#6f51ed'
    },
    img: {
        maxHeight: "20%",
        maxWidth: "20%",
    },
    imgButton: {
        maxHeight: "80%",
        maxWidth: "80%",
    },
    container: {
        marginTop: "-40px",
        paddingTop: "20px",
        justifyContent: "center",
        alignItems: "center",
        text: "center",
        textAlign: "center",
    },
    paperTitle: {
        marginTop: "-40px",
        paddingTop: "20px",
        height: "70px",
        width: "280px",
        textAlign: "center",
    },
    scroll: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 390,
        height: 390,
        border: 1
    },
    containersInfo: {
        borderRadius: 5,
        width: '50px'
    },
    avatarContainer: {
        paddingLeft: '70px',
        paddingRight: '70px',
    },
    userIcon:{
        paddingLeft: '100px'

    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    infoCardsColumn: {
        paddingTop: 12, paddingBottom: 12, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ECA800', color: '#FFFFFF',
        borderRadius: 15, fontWeight: "bold", width: 'full', height: 'full', textAlign: "center", flex: 1, borderColor: '#FFD90A', borderWidth: 6,
    },
}));

function CalendarActivities(props) {

    const dispatch = useDispatch();
    
    const role = useSelector(({ auth }) => auth.user.role);
    const calendars = useSelector(({ MisTareasApp }) => MisTareasApp.subjectCalendarSlice.data);
    const subjects = useSelector(({ MisTareasApp }) => MisTareasApp.subjectCalendarSlice.subjects.data);
    const [open, setOpen] = React.useState(true);
    const [eventData, setEventData] = React.useState([]);
    const subjectsCalendar = Object.entries(subjects).map(([key, value]) => ({key, value}));

    const info = useSelector(({ auth }) => auth.user);
    // const escuelabaja = role== 'alumno' && info.grade <= 3 ? true : false ;
    const nivel = role == 'alumno' ? info.grade > 3 ? 2 : 1 : 0 ;
    
	const theme = {
		background: [
			'assets/images/preescolar/BackgroundPreescolar.png',
			'assets/images/preescolar/pantalla12.png',
			'assets/images/preescolar/BackgroundPrimariaAlta.png'
		],
		island1: [
			'assets/images/preescolar/islaTareas.png',
			'assets/images/preescolar/explorer.png',
			'assets/images/preescolar/MisTareasPLANETA.png'
		],
		island2: [
			'assets/images/preescolar/islaMundoLIA.png',
			'assets/images/preescolar/comunicacion.png',
			'assets/images/preescolar/MiMundoLIA.png'
		],
		island3: [
			'assets/images/preescolar/islaClases.png',
			'assets/images/preescolar/artes.png',
			'assets/images/preescolar/MisClases.png'
		],
        fonts: [
            'grobold',
            'rager',
            'haettenschweilerRegular',
        ],
	}

    const classes = useStyles({nivel, theme});

    const SubjectListItem = ({ club, subject }) => {
        const [ open, setOpen ] = useState(false)
        const handleClick = () => {
            setOpen(!open)
        }
        var reformattedArray = subject.map(function(obj){
            var color = {};
            color[obj.club_name] = obj.base_color;
            return color;
        });

        function handleSubmit( calendarId, color) {
            setEventData([]);
            getEvents(events => { setEventData(eventData=> [...eventData, ...events]) }, process.env.REACT_APP_CALENDAR_KEY, calendarId.toString(), color.toString() );
        }

        return (
            <div>
                <ListItem button key={club}  onClick={handleClick}>
                    <ListItemText
                        primary={club}
                        style={{
                            backgroundColor:reformattedArray[0][club],
                            padding: 5,
                            borderRadius: 30,
                            textAlign:"center"
                        }}
                    />
                    {open }
                </ListItem>
                <Collapse
                    in={open}
                    timeout='auto'
                    unmountOnExit
                >
                    {subject ?
                        <List
                            component='li'
                            disablePadding key={club}
                        >
                            {subject.map(data => {
                                return (
                                    <ListItem button id={data.id}>
                                        <ListItemText
                                            key={data.id}
                                            value={data.calendar_id}
                                            primary={data.custom_name}
                                            style={{
                                                backgroundColor: data.custom_color,
                                                padding: 5,
                                                marginLeft: 10,
                                                borderRadius:30,
                                                textAlign:"center"
                                            }}
                                            onClick={() => handleSubmit(data.calendar_id, data.custom_color)}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                        :
                        null
                    }
                </Collapse>
            </div>
        )
    }

    useEffect(() => {
        setEventData([]);
        for (let i in calendars) {

            getEvents(events => { setEventData(eventData=> [...eventData, ...events]) }, process.env.REACT_APP_CALENDAR_KEY, calendars[i].calendar_id.toString(), calendars[i].custom_color.toString() );
        }

    }, [calendars]);

    useEffect(() => {
        dispatch(getStudentCalendars());
        dispatch(getStudentSubjects());
    }, []);

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    return (

        <div
            className="flex-1"
            style={{
                backgroundImage: `url(${ theme.background[nivel] })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

            <FuseAnimateGroup
                className="flex flex-wrap"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >
                <LogoutButton/>

                <div className="float flex w-full flex-wrap ">
                    <div className="flex w-full md:w-1/2">
                        <Button
                            className={clsx(classes.button)}
                            style={{
                                backgroundColor: 'transparent',
                            }}
                            to={`/apps/landing`}
                            component={Link}
                            type="button"
                        >
                            <img className={clsx(classes.img)} src={ theme.island3[nivel] }/>                            
                            <Typography className={clsx(classes.TextTitle)}>
                                Mis Clases
                            </Typography>
                        </Button>
                    </div>


                    {/* ------------------------- Avatar and User Info --------------------- */}
                    <div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row">
                        <UserInfoHeader/>
                    </div>
                </div>

                < div className="w-full pt-20 pb-20 m-20 pr-20 pl-20 items-center justify-center flex-wrap flex-row flex">
                    <Grid container spacing={3}>
                        {subjectsCalendar ?
                            <Grid item xs={12} sm={2}>
                                <Paper className={classes.paper}>
                                    <List component='nav' aria-labelledby='nested-list-subheader'>
                                        {subjectsCalendar.map(club => {
                                            return (
                                                <SubjectListItem key={club.key} club={club.key} subject={club.value} />
                                            );
                                        })}
                                    </List>
                                </Paper>
                            </Grid>
                            :
                            <CircularProgress />
                        }
                        <Grid item xs={12} sm={8}>
                            <Paper className={classes.paper}>
                                <Calendar localizer={localizer} events={eventData.length == 0 ? [] : eventData} defaultView='week' messages={{
                                    next: "Siguiente",
                                    previous: "Anterior",
                                    today: "Hoy",
                                    month: "Mes",
                                    week: "Semana",
                                    day: "Día",
                                    noEventsInRange: "No hay eventos programados"
                                }}
                                    views={['day', 'week']}
                                    showMultiDayTimes={true} startAccessor="start" endAccessor="end"
                                    eventPropGetter={event => ({
                                        style: {
                                            fontSize: "10px",
                                            backgroundColor: event.customColor,
                                            textAlign: "center",
                                            alignContent: 'center',
                                            alignItems: 'center'
                                        }
                                    })}
                                    components={{
                                        event: CustomEvent,
                                    }}
                                    formats={formats}
                                    className={classes.root}
                                    min={new Date(0, 0, 0, 8)}
                                    max={new Date(0, 0, 0, 18)}
                                    tooltipAccessor={null}
                                >
                                </Calendar>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <Paper elevation={0} className={classes.paperNav}>
                                {/*<div className="flex w-full flex-col text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.buttonClass}
                                        endIcon={<Icon>laptop</Icon>}
                                    >
                                        Entrar A Clase
                                    </Button>
                                </div>
                                <div className="flex w-full flex-col text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.buttonClass}
                                        endIcon={<Icon>CalendarToday</Icon>}
                                    >
                                        Club Lia Eventos
                                    </Button>
                                </div>*/}
                                <div className="flex w-full flex-col text-center">
                                    <Button
                                        className={clsx(classes.button)}
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/loginp`}
                                        component={Link}
                                        type="button"
                                    >
                                        <img className={clsx(classes.imgButton)} src={ theme.island2[nivel] } alt="logo" />
                                    </Button>
                                    <Button
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/loginp`}
                                        component={Link}
                                        type="button"
                                    >
                                        <Typography className={clsx(classes.Text)}>
                                            Mi Mundo Lia
                                        </Typography>
                                    </Button>
                                </div>
                                <div className="flex w-full flex-col text-center">
                                    <Button
                                        className={clsx(classes.button)}
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/apps/sections/mistareas`}
                                        component={Link}
                                        type="button"
                                    >
                                        <img className={clsx(classes.imgButton)} src={ theme.island1[nivel]} />
                                    </Button>
                                    <Button
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/apps/sections/mistareas`}
                                        component={Link}
                                        color="secondary"
                                    >
                                        <Typography className={clsx(classes.Text)}>
                                            { !nivel == 0 ? 'Mis Tareas' : 'Mis Actividades' }
                                        </Typography>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </FuseAnimateGroup>
        </div>
    );
}

export default withReducer('MisTareasApp', reducer)(CalendarActivities);
