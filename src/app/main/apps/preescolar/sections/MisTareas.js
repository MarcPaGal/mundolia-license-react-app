import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { getTareasPendientes } from '../store/tareasPendientesSlice';
import { getTareasEntregadas } from '../store/tareasEntregadasSlice';
import { getTareasCalificadas } from '../store/tareasCalificadasSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
// import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { logoutUser } from 'app/auth/store/userSlice';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getPanelInfo } from '../store/panelSlice';
import { getCalendar, openCalendarDialog } from '../store/calendarSlice';
import CalendarDialog from './CalendarDialog';
import Badge from '@material-ui/core/Badge';
import UserInfoHeader from '../components/UserInfoHeader';
import LogoutButton from '../components/LogoutButton';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		// fontWeight: "bold",
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "42px" : "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	Text: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "24px" : "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextCalendar: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "18px" : "13px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextInfo: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[1],
		fontSize: ({ nivel }) => nivel == 2 ? "19px" : "14px",
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
		marginTop: "-40px",
		paddingTop: "20px",
		// height: "90px",
		
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
	},
	paperTitle: {
		marginTop: "-40px",
		paddingTop: "20px",
		height: "70px",
		width: "280px",
		textAlign: "center", //*important
	},
	paperTitleAlta: {
		marginTop: "-90px",
		paddingTop: "20px",
		paddingButton: "40px",
		height: "70px",
		width: "280px",
		textAlign: "center", //*important
	},
	paperCalendar: {
		marginTop: "-40px",
		paddingTop: "20px",
		height: "70px",
		width: "180px",
		textAlign: "center", //*important
	},
	scroll: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 390,
		height: 390,
		border: 1
	},
	scrollAlta: {
		width: '100%',
		// height: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 550,
		height: 550,
		// maxHeight: '100%',
		// height: '100%',
		border: 1,
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
	},
	scrollCalendar: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 390,
		height: 180,
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
		paddingTop: 12, 
		paddingBottom: 12, 
		paddingLeft: 5, 
		paddingRight: 5, 
		//backgroundColor: '#ECA800', 
		color: '#FFFFFF',												
		borderRadius: 15, 
		fontWeight: "bold", 
		width: 'full', 
		height: 'full', 
		textAlign: "center", 
		flex: 1, 
		borderColor: '#FFD90A', 
		borderWidth: 6,
		background: 'rgb(255,231,5)',
		background: 'radial-gradient(circle, rgba(255,231,5,1) 0%, rgba(234,160,0,1) 100%)'
	},
	linkCardsColumn: {
		paddingTop: 12, 
		paddingBottom: 12, 
		paddingLeft: 5, 
		paddingRight: 5, 
		//backgroundColor: '#ECA800', 
		//color: '#FFFFFF',												
		//borderRadius: 15, 
		//fontWeight: "bold", 
		//width: 'full', 
		//height: 'full', 
		textAlign: "center", 
		flex: 1, 
		//borderColor: '#FFD90A', 
		//borderWidth: 6,
		//background: 'rgb(255,231,5)',
		//background: 'radial-gradient(circle, rgba(255,231,5,1) 0%, rgba(234,160,0,1) 100%)'
	},
	calendarPoints: {
		paddingLeft: 5, paddingRight: 5, color: '#FFFFFF',
		borderRadius: 15, fontWeight: "bold", textAlign: "center", borderColor: '#FFD90A', borderWidth: 6,

	},
	TextDaysCalendar: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[1],
		fontSize: ({ nivel }) => nivel == 2 ? "12px" : "8px",
		color: 'white',
		textShadow: '1px 1px 1px black',
		text: "center",
		alignSelf: "center",
	},
	TextDaysCalendarAlta: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "18px" : "11px",
		color: 'white',
		textShadow: '1px 1px 1px black',
		text: "center",
		alignSelf: "center",
	},

}));

function MisTareas(props) {
	const dispatch = useDispatch();
	
	const routeParams = useParams();
	const role = useSelector(({ auth }) => auth.user.role);
	const pendientes = useSelector(({ PreescolarApp }) => PreescolarApp.tareasPendientes.data);
	const entregadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasEntregadas.data);
	const calificadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasCalificadas.data);
	const panelInfo = useSelector(({ PreescolarApp }) => PreescolarApp.panel.data);
	const calendarInfo = useSelector(({ PreescolarApp }) => PreescolarApp.calendar.data);
	const info = useSelector(({ auth }) => auth.user);
	// const escuelabaja = role== 'alumno' && info.grade <= 3 ? true : false ; 

	const nivel = role == 'alumno' ? info.grade  > 3 ? 2 : 1 : 0 ; 

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

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	useDeepCompareEffect(() => {
		dispatch(getTareasPendientes());
		dispatch(getTareasEntregadas());
		dispatch(getTareasCalificadas());
		dispatch(getPanelInfo());
		dispatch(getCalendar());
	}, [dispatch, routeParams]);

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if (token) {
			console.log("token_exists::");
		} else {
			console.log("token_exists::no");
		}
	}


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
								textTransform: 'none',
							}}
							to={`/apps/landing`}
							component={Link}
							type="button"
						>
							<img className={clsx(classes.img)} src={ theme.island1[nivel]} />
							<Typography className={clsx(classes.TextTitle)}>
								{!nivel == 0 ? 'Mis Tareas' : 'Mis Actividades'}
							</Typography>
						</Button>
					</div>


					{/* ------------------------- Avatar and User Info --------------------- */}
					<div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row" >
						<UserInfoHeader/>
					</div>
				</div>

				< div className="w-full pt-28 pb-28 m-20 pr-40 pl-40 items-center justify-center flex-wrap flex-row flex">

					{/* -------------------------- tasks undelivered ------------------------- */}

					<Paper
						className={	nivel == 2  ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
									: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20") }
						elevation={ nivel == 2 ? 0 : 3 }
						style={{
							backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")` ,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'transparent',
						}}>

						<div className={ nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<Typography className={clsx(classes.Text)}>
								{ nivel == 0 ?  'Actividades Pendientes' 
									: nivel == 1 ? 'Tareas Pendientes' 
									: 'Mis Tareas Pendientes'  }
							</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{pendientes &&
									pendientes.map(row => (
										<>

											{ nivel == 1 ?
												<>
												<div className=" flex w-full p-4 text-center items-center justify-center" style={{display:'table-row'}}>
													<p className={clsx(classes.linkCardsColumn)} style={{ display:'table-cell', width:'20%', verticalAlign:'middle', padding:15}}>
														<Link to={'/apps/sections/mitarea/' + row.id} >
															{row.remaining_days > 5 ?
																<img src={"assets/images/preescolar/tiempo-tareaspendientes.png"}/>
																// tiempo-tareaspendientes.png
																: row.remaining_days >= 1 ?
																	<img src={"assets/images/preescolar/proxima-tareaspendientes.png"} />
																	:
																	<img src={"assets/images/preescolar/pendientes.png"} />
															}
														</Link>
													</p>
													<p className={clsx(classes.infoCardsColumn)} style={{display:'table-cell', width:'40%', verticalAlign:'middle'}}>
														<Typography className={clsx(classes.TextInfo)}>
															{row.name}
														</Typography>
													</p>
													<p className={clsx(classes.infoCardsColumn)} style={{display:'table-cell', width:'40%', verticalAlign:'middle'}}>
														<Typography className={clsx(classes.TextInfo)}>
															{row.finish_date.slice(0, 10)}
														</Typography>
													</p>
												</div>
												</>
												:
												nivel == 0 ?

													<div className=" flex w-full p-4 text-center items-center justify-center" style={{ display: 'table-row' }}>
														<p className={clsx(classes.linkCardsColumn)} style={{ display: 'table-cell', width: '20%', verticalAlign: 'middle', padding: 15 }}>
															<Link to={'/apps/sections/mitarea/' + row.id} >
																{row.remaining_days > 5 ?
																	<img src={"assets/images/preescolar/tiempo-tareaspendientes.png"} />
																	// tiempo-tareaspendientes.png
																	: row.remaining_days >= 1 ?
																		<img src={"assets/images/preescolar/proxima-tareaspendientes.png"} />
																		:
																		<img src={"assets/images/preescolar/pendientes.png"} />
																}
															</Link>
														</p>
														<p className={clsx(classes.infoCardsColumn)} style={{ display: 'table-cell', width: '80%', verticalAlign: 'middle' }}>
															<Typography className={clsx(classes.TextInfo)}>
																{row.name}
															</Typography>
														</p>

													</div>
													:
													<>
														<div className="flex w-1/5 p-12 text-center items-center justify-center justify-between">
															<Link to={'/apps/sections/mitarea/' + row.id} >
																{row.remaining_days > 5 ?
																	<img src={"assets/images/preescolar/tiempo-tareaspendientes.png"} />
																	// tiempo-tareaspendientes.png
																	: row.remaining_days >= 1 ?
																		<img src={"assets/images/preescolar/proxima-tareaspendientes.png"} />
																		:
																		<img src={"assets/images/preescolar/pendientes.png"} />
																}
															</Link>
														</div>
														<div className=" flex w-2/5 p-12 text-center items-center justify-center"
															style={{
																backgroundImage: `url("assets/images/primariaalta/Boton_Small.png")`,
																backgroundPosition: 'center',
																backgroundSize: 'contain',
																backgroundRepeat: 'no-repeat',
															}}
														>
															<Typography className={clsx(classes.TextInfo)}>
																{row.name}
															</Typography>
														</div>
														<div className=" flex w-2/5 p-12 text-center items-center justify-center"
															style={{
																backgroundImage: `url("assets/images/primariaalta/Boton_Small.png")`,
																backgroundPosition: 'center',
																backgroundSize: 'contain',
																backgroundRepeat: 'no-repeat',
															}}
														>
															<Typography className={clsx(classes.TextInfo)}>
																{row.finish_date.slice(0, 10)}
															</Typography>
														</div>
													
												</>
											}


										</>
									))
								}
							</div>
							{ pendientes && pendientes.length > 0  ?
								null 
								:
								<div className="flex flex-1 items-center justify-center h-full">
									<Typography className={clsx(classes.TextInfo)}>
										{ !nivel == 0 ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!' }
									</Typography>
								</div>								
							}
						</List>
					</Paper>

					{/* -------------------------- tasks delivered ------------------------- */}

					<Paper
						className={	nivel == 2  ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
									: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20") }
						elevation={ nivel == 2 ? 0 : 3 }
						style={{
							backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")` ,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'transparent',
						}}>

						<div className={ nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<Typography className={clsx(classes.Text)}>
								{ nivel == 0 ?  'Actividades Entregadas' 
									: nivel == 1 ? 'Tareas Entregadas' 
									: 'Mis Tareas Entregadas'  }
							</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{entregadas &&
									entregadas.map(row => (
										<>
											<div className="flex w-1/5 p-12 text-center items-center justify-center">
											<Link to={'/apps/sections/mitarea/'+row.id} ><img src="assets/images/preescolar/entregado.png"/></Link>
											</div>
											{ nivel == 1 ?
											<>
												<div className=" flex w-2/5 p-12 text-center items-center justify-center"
													style={{
														backgroundImage: `url("assets/images/preescolar/fecha.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat',
													}}
												>
													<Typography className={clsx(classes.TextInfo)}>
														{row.name}
													</Typography>
												</div>
												<div className=" flex w-2/5 p-12 text-center items-center justify-center"
													style={{
														backgroundImage: `url("assets/images/preescolar/fecha.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat',
													}}
												>
													<Typography className={clsx(classes.TextInfo)}>
														Lista
													</Typography>
												</div>
											</>
											:
												nivel == 0 ?
												<div className=" flex w-4/5 p-4 text-center items-center justify-center">
														<p className={clsx(classes.infoCardsColumn)} >
															<Typography className={clsx(classes.TextInfo)}>
															{row.name}
															</Typography>
														</p>
													</div>
													:
													<>
														<div className=" flex w-2/5 p-12 text-center items-center justify-center"
															style={{
																backgroundImage: `url("assets/images/primariaalta/Boton_Small.png")`,
																backgroundPosition: 'center',
																backgroundSize: 'contain',
																backgroundRepeat: 'no-repeat',
															}}
														>
															<Typography className={clsx(classes.TextInfo)}>
																{row.name}
															</Typography>
														</div>
														<div className=" flex w-2/5 p-12 text-center items-center justify-center"
															style={{
																backgroundImage: `url("assets/images/primariaalta/Boton_Small.png")`,
																backgroundPosition: 'center',
																backgroundSize: 'contain',
																backgroundRepeat: 'no-repeat',
															}}
														>
															<Typography className={clsx(classes.TextInfo)}>
																Lista
															</Typography>
														</div>
													</>
												
											}
										</>
									))
								}
							</div>
							{entregadas && entregadas.length > 0 ?
								null
								:
								<div className="flex flex-1 items-center justify-center h-full">
									<Typography className={clsx(classes.TextInfo)}>
										{ !nivel == 0 ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!' }
									</Typography>
								</div>
							}
						</List>
					</Paper>

					{/* -------------------------- tasks qualified ------------------------- */}
					<Paper
						className={	nivel == 2  ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
									: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20") }
						elevation={ nivel == 2 ? 0 : 3 }
						style={{
							backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")` ,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'transparent',
						}}>

						<div className={ nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<Typography className={clsx(classes.Text)}>
								{ nivel == 0 ?  'Actividades Calificadas' 
									: nivel == 1 ? 'Tareas Calificadas' 
									: 'Mis Tareas Calificadas'  }
							</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{calificadas &&
									calificadas.map(row => (
										<>
											<div className="flex w-1/5 p-12 text-center items-center justify-center">
											<Link to={'/apps/sections/mitarea/' + row.id} >
												<img src="assets/images/preescolar/miscalificaciones.png"/>
											</Link>
											</div>

												<div className=" flex w-2/5 p-12 text-center items-center justify-center"
													style={{
														backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_Small.png")` : `url("assets/images/preescolar/fecha.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat',
													}}
												>
													<Typography className={clsx(classes.TextInfo)}>
														{row.name}
													</Typography>
												</div>
												<div className=" flex w-2/5 p-12 text-center items-center justify-center"
													style={{
														backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_Small.png")` : `url("assets/images/preescolar/fecha.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat',
													}}
												>
													<Typography className={clsx(classes.TextInfo)}>
														{parseFloat(row.score).toFixed(1)}
													</Typography>
												</div>
										</>

									))
								}
							</div>
							{panelInfo && panelInfo.score.length > 0 ?
								null
								:
								<div className="flex flex-1 items-center justify-center h-full">
									<Typography className={clsx(classes.TextInfo)}>
										{ !nivel == 0 ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!' }
									</Typography>
								</div>
							}
						</List>
					</Paper>

					{/* -------------------------- calendar ------------------------- */}
					{ nivel == 2 ?
						<Paper
							className={nivel == 2 ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
								: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20")}
							elevation={nivel == 2 ? 0 : 3}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundColor: 'transparent',
							}}>

							<div className={nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
								style={{
									backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
									backgroundPosition: 'center',
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
								}}
							>
								<Typography className={clsx(classes.Text)}>
									{!nivel == 0 ? 'Calendario Semanal de tareas' : 'Calendario Semanal de Actividades'}
									{/* Nuevas Tareas */}
								</Typography>
							</div>
							{/* ----------------------------Info inside card-------------------------- */}
							<List className={nivel == 2 ? classes.scroll : classes.scrollAlta} >
								<div className="flex flex-row flex-wrap relative overflow-hidden mt-40">


									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Lunes
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Martes
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Miercoles
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Jueves
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Viernes
										</Typography>
									</div>

									{calendarInfo &&
										calendarInfo.map(row => (
											< div className=" flex w-1/5 p-3 text-center items-center justify-center flex-col h-full">


												{row && row.dayActivities.length > 0 ?
													<>
														{row.dayActivities && row.dayActivities.map(rows => (
															// 	<Badge badgeContent={ rows.total } color={rows.custom_color} >

															// </Badge>
															<p className={clsx(classes.calendarPoints)}
																style={{
																	backgroundColor: rows.custom_color,
																}}>
																<Typography className={clsx(classes.TextDaysCalendar)}>
																	{rows.total}
																</Typography>
															</p>
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
					:
						<Paper
							className={clsx(classes.container), "w-full max-w-200 rounded-8 items-center justify-center flex md:w-1/4 sm:w-1/2 flex-col m-20"}
							elevation={3}

							style={{
								backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',

							}}>

							<div className={clsx(classes.paperCalendar)}
								style={{
									backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
									backgroundPosition: 'center',
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
								}}
							>
								<Typography className={clsx(classes.TextCalendar)}>
									{ !nivel == 0 ? 'Calendario Semanal de tareas' : 'Calendario Semanal de Actividades' }
									{/* Nuevas Tareas */}
								</Typography>
							</div>
							{/* ----------------------------Info inside card-------------------------- */}
							<List className={classes.scrollCalendar}
							onClick={ calendarInfo ? ev => dispatch(openCalendarDialog(calendarInfo)) : null }
							>

								<div className="flex flex-row flex-wrap relative overflow-hidden"
								// onClick={ ev => dispatch(openCalendarDialog(calendarInfo)) }
								>


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

									{ calendarInfo &&
										calendarInfo.map(row => (
											< div className=" flex w-1/5 p-3 text-center items-center justify-center flex-col h-full">


												{ row && row.dayActivities.length > 0 ?
													<>
													{ row.dayActivities && row.dayActivities.map(rows => (
															// 	<Badge badgeContent={ rows.total } color={rows.custom_color} >

															// </Badge>
															<p className={clsx(classes.calendarPoints)}
															style={{
																backgroundColor: rows.custom_color,
															}}>
																<Typography className={clsx(classes.TextDaysCalendar)}>
																{rows.total}
																</Typography>
															</p>
													))}

													</>
												:
													null

												}
											</div>
										))
									}



								</div>
								{/* {panelInfo && panelInfo.score.length > 0 ?
									null
									:
									<div className="flex flex-1 items-center justify-center h-full">
										<Typography className={clsx(classes.TextInfo)}>
											{ escuelabaja ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!' }
										</Typography>
									</div>
								} */}
							</List>
						</Paper>
					}

					<Popover
						open={Boolean(userMenu)}
						anchorEl={userMenu}
						onClose={userMenuClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						classes={{
							paper: 'py-8'
						}}
					>
						<MenuItem
							onClick={() => {
								dispatch(logoutUser());

								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</MenuItem>
					</Popover>
					<CalendarDialog />
				</div>
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('PreescolarApp', reducer)(MisTareas);