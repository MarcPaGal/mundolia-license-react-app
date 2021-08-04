import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Preescolar.css';
import { Link } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import {isMobile} from 'react-device-detect';
import {getStudentCalendars} from "./store/subjectCalendarSlice";
import LogoutButton from './components/LogoutButton';

const useStyles = makeStyles(theme => ({
	Text: {
		// fontWeight:"bold",
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[1] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "42px" : "32px",
		fontWeight: '500',
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	button: {

		"&:hover": {
			transform: "scale(1.2)",
			// opacity: "0%",
			// width:"120%"
		}
	},
	img: {
		animationName: "floating",
		animationDuration: "6s",
		animationIterationCount: "infinite",
		animationTimingFunction: "ease-in-out",
	},
	listenIcon: {

		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		// paddingLeft: '6px'
	},
	dashboardText: {
		// fontWeight:"bold",
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[1] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "38px" : "28px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		padding: 15,
	},
}));


function PreescolarLayout(props) {
	const dispatch = useDispatch();
	
	const role = useSelector(({ auth }) => auth.user.role);
	const grade = useSelector(({ auth }) => auth.user.grade);
	// const escuelabaja = role== 'alumno' && grade <= 3 ? true : false ; 
	const nivel = role == 'alumno' ? grade > 3 ? 2 : 1 : 0 ;
	// const url =  `url("assets/sounds/Mi Mundo Lia.m4a")`;
    const audioMimundoLia = new Audio("assets/sounds/Mi Mundo Lia.mp3");
	const audioDashboard = new Audio("assets/sounds/Dashboard.mp3");
	const audioMisClases= new Audio("assets/sounds/Mis Clases.mp3");
	const audioMisTareas = new Audio("assets/sounds/Mis Tareas.mp3");
	const audioMisActividades = new Audio("assets/sounds/Mis Actividades.mp3");	

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
			'haettenschweilerRegular',
		],
	}

	const classes = useStyles({nivel, theme}); 

	// var windowW = window.innerWidth;
	// var device = windowW < '1170' ? true : false ; 

	const [width, setWidth] = useState(window.innerWidth);
	const [device, setDevice] = useState(false);

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if(token){
			console.log("token_exists::");
		}else{
			console.log("token_exists::no");
		}
	}

	function playMundolia() {
		console.log(role);
		console.log(grade);
		audioMimundoLia.play();
	}
	function playDashboard() {
		audioDashboard.play();
	}
	function playMisClases() {
		audioMisClases.play();
	}
	function playMisTareas() {
		audioMisTareas.play();
	}
	function playMisActividades() {
		audioMisActividades.play();
	}

	

	useEffect(() => {
		const updateWindowDimensions = () => {
			const newWidth = window.innerWidth;
			setWidth(newWidth);
			if (newWidth < '1170' ){
				setDevice(true);
			}
			else{
				setDevice(false);
			}
			
			console.log("updating Width");

		  };
	  
		  window.addEventListener("resize", updateWindowDimensions);
	  
		  return () => window.removeEventListener("resize", updateWindowDimensions) 

	}, []);


	return (
        <div className="flex flex-1" 
		style={{
		backgroundImage: `url(${theme.background[nivel]})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			font: 'haettenschweilerRegular'
		}}>

            <FuseAnimateGroup
                className="flex flex-wrap p-64"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >

				<LogoutButton/>

				{/* -----------------------Mis Tareas/Mis Actividades------------------- */}
				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center">
					<Button
						disableRipple
						className={clsx(classes.button)}
						style={{
							backgroundColor: 'transparent',
							zIndex:1
						}}
						to={`/apps/sections/mistareas`}
						component={Link}
						type="button"
						// onMouseEnter={ playMisTareas }
					>
						<img src={ theme.island1[nivel] } />
					</Button>
					<Button
						disableRipple
						style={{
							backgroundColor: 'transparent',
							zIndex:3,
							textTransform: 'none',
						}}
						to={`/apps/sections/mistareas`}
						component={Link}
						// className="justify-start px-32"
						color="secondary"
						onMouseEnter={ nivel == 0 && !isMobile ? playMisActividades : null }
					>
						<Typography className={clsx(classes.Text)}>
							{ !nivel == 0 ? 'Mis Tareas' : 'Mis Actividades' }
						</Typography>
					</Button>
					{ isMobile && nivel == 0 ?
						<Button
							style={{
								backgroundColor: 'transparent',
							}}
							onClick={playMisActividades}
						>
							<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
						</Button>
						:
						null
					}
				</div>

				{/* -----------------------Mundo Lia----------------------- */}
				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center" raised>
					<Button
						disableRipple
						className={clsx(classes.button)}
						style={{
							backgroundColor: 'transparent',
							zIndex:1
						}}
						to={`/loginp`}
						component={Link}
						type="button"
					>
						<img src={ theme.island2[nivel] } alt="logo" />
					</Button>
					<Button
						disableRipple
						style={{
							backgroundColor: 'transparent',
							zIndex:3,
							textTransform: 'none',

						}}
						to={`/loginp`}
						component={Link}
						type="button"
						// name={mundolia}
						// id={'mundolia'}
						onMouseEnter={ nivel == 0 && !isMobile ? playMundolia : null }
					>
						<Typography className={clsx(classes.Text)}>
						Mi Mundo Lia
						</Typography>
					</Button>
					{ isMobile && nivel == 0 ?
						<Button
							style={{
								backgroundColor: 'transparent',
							}}
							onClick={playMundolia}
						>
							<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
						</Button>
						:
						null
					}
				</div>

				{/* -----------------------Mis Clases----------------------- */}
				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center">
					<Button
						disableRipple
						className={clsx(classes.button)}
						style={{
							backgroundColor: 'transparent',
							zIndex:1
						}}
						component={Link}
						type="button"
						to={`/apps/sections/calendario`}
					>
						<img src={ theme.island3[nivel] } alt="logo" />
					</Button>
					<Button
						disableRipple
						style={{
							backgroundColor: 'transparent',
							zIndex:3,
							textTransform: 'none',

						}}
						to={`/apps/sections/calendario`}
						component={Link}
						type="button"
						onMouseEnter={ nivel == 0 && !isMobile ? playMisClases : null }
					>
						<Typography className={clsx(classes.Text)}>
							{ 'Mis Clases'}
						</Typography>
					</Button>
					{ isMobile && nivel == 0 ?
						<Button
						disableRipple
							style={{
								backgroundColor: 'transparent',
							}}
							onClick={playMisClases}
						>
							<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
						</Button>
						:
						null
					}
				</div>
				

				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col items-center justify-center flex-1" >
					<Button
						disableRipple
						justifyContent="center"
						className={clsx(classes.button)}
						// className="flex items-center justify-between px-16 h-64 border-b-1"
						style={{
							backgroundColor: 'transparent',
							backgroundImage: `url("assets/images/preescolar/ButtonLIA.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							// width: "100%",
							textTransform: 'none',

							// maxHeight: '100%',
							// maxWidth: '100%',

						}}
						to={`/apps/sections/miscore`}
						component={Link}
						type="button"
						onMouseEnter={ nivel == 0 && !isMobile ? playDashboard : null }
					> 						

						<Typography className={clsx(classes.dashboardText)}>
							Dashboard
						</Typography>
					</Button>
					{ isMobile && nivel == 0 ?
						<Button
						disableRipple
							style={{
								backgroundColor: 'transparent',
							}}
							onClick={playDashboard}
						>
							<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
						</Button>
						:
						null
					}
					
				</div>

            </FuseAnimateGroup>

        </div>
	);
}

export default PreescolarLayout;
