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
import { getPanelInfo } from '../store/panelSlice';
import { getTareasPendientes } from '../store/tareasPendientesSlice';
import { getTareasEntregadas } from '../store/tareasEntregadasSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import { openAvatarLayout } from 'app/store/fuse/avatarSlice';
import Avatar from '@material-ui/core/Avatar';
import { setRedirect, getPHPFoxUrl } from '../../../../auth/store/redirectSlice'
import UserInfoHeader from '../components/UserInfoHeader';
import LogoutButton from '../components/LogoutButton';

const useStyles = makeStyles(theme => ({
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
	TextInfo: {
		fontSize: "16px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextLeft: {
		fontSize: "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "left",
		alignSelf: "flex-start",
		paddingLeft: 5
	},
	TextSubtitle:{
		fontSize: "26px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	yellowIcons: {
		// fontWeight: "bold",
		fontSize: "28px",
		color: 'yellow',
		// textShadow: '2px 2px 2px black',
	},
	buildIcon:{
		fontSize: "40px",
		color:'white',
	},
	button: {

		"&:hover": {
			transform: "scale(1.2)"
			// width:"120%"
		},
		text: "center",
	},
	logoLia:{
		maxHeight: "10%",
		maxWidth: "10%",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		display: 'inline',
		paddingLeft: 10

	},
	img: {
		maxHeight: "20%",
		maxWidth: "20%",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		display: 'inline',
	},
	container: {
		// marginTop: "-40px",
		// paddingTop: "20px",
		// height: "90px",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		// display: 'block',
		backgroundColor: 'rgba(255, 255, 255, .9)',

	},
	paperTitle: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		// maxHeight: 550,
		// height: 550,
		// maxHeight: '100%',
		// height: '100%',
		// border: 1,
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
	},
	scroll: {
		width: '100%',
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
	card: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 620,
		height: 620,
		// maxHeight: '100%',
		// height: '100%',
		border: 0,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
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
	// ChannelsList: {
	// 	marginTop: 10,
	// 	// borderColor: '#FFFFFF',
	// 	borderColor: '#FFFFFF',
    // 	borderTopWidth: 3,
    // 	borderRadius: 1,
	// },
	channelIcon: {
		maxHeight: 60,
		maxWidth: 60,
	}, 
	TextChannel: {
		fontSize: "18px",
		color: 'white',
		// textShadow: '2px 2px 2px black',
		// text: "left",
		// alignSelf: "left",
		// textAlign: "left",
	},
	avatarLeft: {
		width: 80,
		height: 80,
		// position: 'absolute',
		// top: 92,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '80%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	},
	customBadge: {
		backgroundColor: "#8a02b0",
		color: "white", 
		// marginRight: 12,
		// marginLeft: 12
	  },
	TextTitleAlta: {
		fontWeight: "bold",
		fontSize: "28px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		padding: 8,
	},
	textBlue:{
		fontWeight: "bold",
		fontSize: "28px",
		color: "#064d9e"
	},
	buttonLarge: {
		// marginTop: "-40px",
		// paddingTop: "20px",
		height: "70px",
		width: "300px",
		textAlign: "center", //*important
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		flexDirection: 'row'
	},
	yellowIconsAlta:{
		fontSize: "28px",
		color: 'yellow',
		margin: 8,
		// paddingTop: 4
	}


}));

function MiScore(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();
	const user = useSelector(({ auth }) => auth.user);
	const role = useSelector(({ auth }) => auth.user.role);
	const pendientes = useSelector(({ PreescolarApp }) => PreescolarApp.tareasPendientes.data);
	const entregadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasEntregadas.data);
	const panelInfo = useSelector(({ PreescolarApp }) => PreescolarApp.panel.data);

	const info = useSelector(({ auth }) => auth.user);
	const escuelabaja = role== 'alumno' && info.grade <= 3 ? true : false ;
	const typeUser = escuelabaja || role== 'preescolar' ? 'escuelabaja' : 'escuelaalta';

	useDeepCompareEffect(() => {
		dispatch(getPHPFoxUrl());	
		dispatch(getPanelInfo());
		dispatch(getTareasPendientes());
		dispatch(getTareasEntregadas());
	}, [dispatch, routeParams]);

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if (token) {
			console.log("token_exists::");
		} else {
			console.log("token_exists::no");
		}
	}

	switch (typeUser) {
		case 'escuelabaja': {
			return (
				<div
					className="flex-1"
					style={{
						backgroundImage: `url("assets/images/preescolar/BackDashboard1.png")`,
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

						< div className="w-full h-full pt-80 items-center justify-center flex-wrap flex-row flex flex-1 h-full">

							{/* -------------------------- Mis Tareas Section ------------------------- */}

							<div
								className={clsx(classes.container), "w-full items-center justify-center flex md:w-1/3 sm:w-1/2 flex-col p-12"}
								style={{
									// backgroundColor: '#783BC6',
									// opacity: 0.5
								}}>
								<List className={classes.scroll} >
									<Link to="/apps/sections/mistareas">
										<img className={clsx(classes.img)} src={escuelabaja ? "assets/images/preescolar/explorer.png" : "assets/images/preescolar/islaTareas.png"} />

										<Typography className={clsx(classes.TextTitle)}>
											{escuelabaja ? 'Mis Tareas' : 'Mis Actividades'}
										</Typography>
									</Link>
									<div className="flex  flex-wrap p-12 relative overflow-hidden flex-row w-full pb-60">
										<div className="w-1/3 flex-col items-center justify-center flex" >
											<Badge badgeContent={pendientes ? pendientes.length : '0'} classes={{ badge: classes.customBadge }} showZero>
												<Icon className={clsx(classes.yellowIcons)} >error_outline</Icon>
											</Badge>
											<Typography className={clsx(classes.Text)}>
												Pendientes
											</Typography>
										</div>

										<div className="w-1/3 flex-col items-center justify-center flex" >
											<Badge badgeContent={entregadas ? entregadas.length : '0'} classes={{ badge: classes.customBadge }} showZero>
												<Icon className={clsx(classes.yellowIcons)} >check</Icon>
											</Badge>
											<Typography className={clsx(classes.Text)}>
												Realizadas
											</Typography>
										</div>

										<div className="w-1/3 flex-col items-center justify-center flex" >
											<Badge badgeContent={panelInfo ? panelInfo.score.length : '0'} classes={{ badge: classes.customBadge }} showZero>
												<Icon className={clsx(classes.yellowIcons)} >star</Icon>
											</Badge>
											<Typography className={clsx(classes.Text)}>
												Calificadas
											</Typography>
										</div>
									</div>




									<div className="flex flex-wrap  w-full border-t-1"
										style={{ borderTopColor: "white", borderBottomColor: "white" }}>

										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_mis-herramientas.png" />
										</div>
										<div className="w-3/4 flex-col items-start justify-center flex p-2" >
											<Button
												underline='hover'
												href="https://docs.google.com/spreadsheets/d/1vETNOINAFfoA_rLmTlEcFg1xRple3GLp4LuX1lwTZcU/edit#gid=743745254"
												target="_blank"
												disableRipple
												style={{
													backgroundColor: 'transparent',
													textTransform: 'none',
												}}
											>
												<Typography className={clsx(classes.TextChannel)}>
													Mis Herramientas
												</Typography>
											</Button>
										</div>
									</div>
									<div className="flex flex-wrap  w-full border-t-1 border-b-1"
										style={{ borderTopColor: "white", borderBottomColor: "white" }}>

										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_recursoslia.png" />
										</div>
										<div className="w-3/4 flex-col items-start justify-center flex p-2" >
											<Button
												href="https://docs.google.com/spreadsheets/d/1vETNOINAFfoA_rLmTlEcFg1xRple3GLp4LuX1lwTZcU/edit#gid=0"
												target="_blank"
												disableRipple
												style={{
													backgroundColor: 'transparent',
													textTransform: 'none',
												}}
											>
												<Typography className={clsx(classes.TextChannel)}>
													Mis Recursos Lia
												</Typography>
											</Button>

										</div>
									</div>





									{/* <div className="flex flex-wrap  w-full border-t-1 border-b-1"
									style={{ borderTopColor: "white", borderBottomColor: "white" }}>
									<div className="flex flex-wrap relative overflow-hidden flex-row border-t-1 w-1/2">
										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_recursoslia.png" />
										</div>
										<div className="w-3/4 flex-col items-center justify-center flex p-2" >
											<Button 
											href="https://docs.google.com/spreadsheets/d/1vETNOINAFfoA_rLmTlEcFg1xRple3GLp4LuX1lwTZcU/edit#gid=0" 
											target="_blank"
											disableRipple
											style={{
												backgroundColor: 'transparent',
												textTransform: 'none',
											}}
											>
												<Typography className={clsx(classes.TextChannel)}>
													Mis Recursos Lia
												</Typography>
											</Button>
										</div>
									</div>
							</div> */}

									{/* <div className="flex flex-wrap  w-full border-t-1"
								style={{ borderTopColor: "white" }}> */}


									{/* <div className="flex flex-wrap  w-full border-t-1 border-b-1"
								style={{ borderTopColor: "white", borderBottomColor: "white" }}>
									<div className="flex flex-wrap relative overflow-hidden flex-row border-t-1 w-1/2 border-r-1" style={{ borderRightColor: "white" }}>
										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clases-pregrabadas.png" />
										</div>
										<div className="w-3/4 flex-col items-center justify-center flex p-2" >
											<Link to="/loginp">
												<Typography className={clsx(classes.TextChannel)}>
													Clases pregrabadas
												</Typography>
											</Link>
										</div>
									</div>
									<div className="flex flex-wrap relative overflow-hidden flex-row border-t-1 w-1/2">
										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_herramienta.png" />
										</div>
										<div className="w-3/4 flex-col items-center justify-center flex p-2" >
											<Link to="/loginp">
												<Typography className={clsx(classes.TextChannel)}>
													Herramientas y recursos más utilizados
												</Typography>
											</Link>
										</div>
									</div>
							</div> */}


								</List>
							</div>

							{/* -------------------------- Mi Mundo LIA ------------------------- */}

							<div
								className={clsx(classes.container), "w-full flex md:w-1/3 sm:w-1/2 flex-col p-12"}
								style={{
									// backgroundColor: '#5406B4',
									// opacity: 0.5
								}}>
								<List className={classes.scroll} >
									<Link to="/loginp">
										<img className={clsx(classes.img)} src={escuelabaja ? "assets/images/preescolar/comunicacion.png" : "assets/images/preescolar/islaMundoLIA.png"} />

										<Typography className={clsx(classes.TextTitle)}>
											Mi Mundo Lia
											<img className={clsx(classes.logoLia)} src="assets/images/preescolar/logos/score_logoclublia.png" />
										</Typography>
									</Link>

									<div className="flex  flex-wrap p-12 relative overflow-hidden flex-row w-full"
										style={{ borderBottomColor: "white" }}>
										<div className="w-1/3 flex-col items-center justify-center flex" >
											<Avatar
												className={clsx(classes.avatarLeft, 'avatar')}
												onClick={ev => dispatch(openAvatarLayout())}

												// width="600"
												// position="right"
												src={user.data.photoURL && user.data.photoURL !== ''
													? user.data.photoURL
													: " assets/images/preescolar/infoestudiante.png"} >
											</Avatar>
										</div>
										<div className="w-2/3 flex-col items-center justify-center flex" >
											<Typography className={clsx(classes.TextSubtitle)}>
												Mi Avatar
											</Typography>
											{/* <Button variant="outlined" color="primary" style={{textTransform: 'none', paddingTop: 5}}>
										<Typography className={clsx(classes.Text)}>
										Herramientas
										</Typography>
									</Button> */}
										</div>

										<div className="flex  flex-wrap p-2 relative overflow-hidden flex-row w-full ">


											{/* <div className="w-1/2 flex-col items-center justify-center flex" > */}


											{/* <div className="w-1/2 flex-col items-center justify-center flex" >
									<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_mi-salon.png" />
									<Typography className={clsx(classes.Text)}>
										Mi salon
									</Typography>
								</div> */}
										</div>



										{/* <div className="flex  flex-wrap p-12 mt-12 relative overflow-hidden flex-row w-full border-t-1 items-center justify-center"
								style={{ borderTopColor: "white" }}>
									<Typography className={clsx(classes.TextSubtitle)}>
										Calendario de Eventos
									</Typography>

								</div> */}

										<div className="flex flex-wrap  w-full border-t-1 mt-16"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clublia.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/loginp" onClick={ev => dispatch(setRedirect("onlinelia"))}>
													<Typography className={clsx(classes.TextChannel)}>
														Canal Online Lia
													</Typography>
												</Link>
											</div>
										</div>
										<div className="flex flex-wrap  w-full border-t-1"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_lia-u.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/logina" >
													<Typography className={clsx(classes.TextChannel)}>
														LIA U
													</Typography>
												</Link>
											</div>
										</div>
										<div className="flex flex-wrap  w-full border-t-1 border-b-1"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_misgrupos.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/loginp" onClick={ev => dispatch(setRedirect("misgrupos"))}>
													<Typography className={clsx(classes.TextChannel)}>
														Mis Grupos
													</Typography>
												</Link>
											</div>
										</div>


										{/* <div className="flex flex-wrap relative overflow-hidden flex-row border-t-1 w-1/2">
										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_novedades.png" />
										</div>
										<div className="w-3/4 flex-col items-center justify-center flex p-2" >
											<Link to="/loginp">
												<Typography className={clsx(classes.TextChannel)}>
													Novedades
												</Typography>
											</Link>
										</div>
									</div> */}

										{/* <div className="flex  flex-wrap  mt-12 pt-20 pb-20 relative overflow-hidden flex-col w-full border-t-1 border-b-1 items-center justify-center"
								style={{ borderTopColor: "white", borderBottomColor: "white" }}>
								
									<Icon className={clsx(classes.buildIcon)}>build</Icon>
									<Typography className={clsx(classes.TextSubtitle)}>
											Sección en construcción
									</Typography>
								</div> */}
									</div>
								</List>
							</div>


							{/* -------------------------- Mis Clases Section ------------------------- */}

							<div
								className={clsx(classes.container), "w-full flex md:w-1/3 sm:w-1/2 flex-col p-12"}
								style={{
									// backgroundColor: '#783BC6',
									// opacity: 0.5
								}}>
								<List className={classes.scroll} >
									<Link to="/apps/sections/calendario">
										<img className={clsx(classes.img)} src={escuelabaja ? "assets/images/preescolar/artes.png" : "assets/images/preescolar/islaClases.png"} />
										<Typography className={clsx(classes.TextTitle)}>
											Mis Clases
										</Typography>
									</Link>

									<div className=" flex flex-wrap flex-col w-full mb-10 mt-10 items-center justify-center pb-80">
										{/* <div className="border-1 flex flex-wrap flex-col p-4 w-350 items-center justify-center"
									style={{ borderColor: "white" }}>
									<Button variant="outlined" color="primary" className="w-full"
									style={{ textTransform: 'none', paddingTop: 5 }}>
										<Typography className={clsx(classes.Text)}>
											15 de mayo del 2021
										</Typography>
									</Button>
									<Button variant="outlined" color="primary" className="w-full"
									style={{ textTransform: 'none', paddingTop: 5 }}>
										<Typography className={clsx(classes.Text)}>
											Entrar
										</Typography>
									</Button>
								</div> */}
									</div>

									<div className="flex  flex-wrap  relative overflow-hidden flex-col w-full  items-center justify-center mt-28">


										<div className="flex flex-wrap  w-full border-t-1 border-b-1"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clases-envivo.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/apps/aula" >
													<Typography className={clsx(classes.TextChannel)}>
														Clases en vivo
													</Typography>
												</Link>
											</div>
										</div>



										{/* <div className="flex flex-wrap relative overflow-hidden flex-row border-t-1 w-1/2">
										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_mis-herramientas.png" />
										</div>
										<div className="w-3/4 flex-col items-center justify-center flex p-2" >
											<Button 
												underline='hover'
												href="https://docs.google.com/spreadsheets/d/1vETNOINAFfoA_rLmTlEcFg1xRple3GLp4LuX1lwTZcU/edit#gid=743745254" 
												target="_blank"
												disableRipple
												style={{
													backgroundColor: 'transparent',
													textTransform: 'none',
												}}
											>
												<Typography className={clsx(classes.TextChannel)}>
													Mis Herramientas
												</Typography>
											</Button>
										</div>
									</div> */}
									</div>
								</List>
							</div>

						</div>
					</FuseAnimateGroup>
				</div>
			);
		}
		case 'primariaalta':
		default: {
			return (
				<div
					className="flex-1"
					style={{
						backgroundImage: `url("assets/images/primariaalta/fondoDashboard.png")`,
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

						< div className="w-full h-full pt-80 items-center justify-center flex-wrap flex-row flex flex-1 h-full">

							{/* -------------------------- Mis Tareas Section ------------------------- */}

							<div className="flex w-full md:w-1/4 sm:w-1/2 flex-col items-center justify-center">

								<div className={classes.paperTitle}>

									<Link to="/apps/sections/mistareas" className="items-center justify-center" >
										<img className={clsx(classes.img)} src={escuelabaja ? "assets/images/primariaalta/explorer.png" : "assets/images/preescolar/islaTareas.png"} />

										<div className="mb-16"
											style={{
												backgroundImage: `url("assets/images/primariaalta/Boton.png")`,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
											}}
										>
											<Typography className={clsx(classes.TextTitleAlta)}>
												{'Mis Tareas'}
											</Typography>
										</div>
									</Link>
								</div>

								<Paper
									className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex flex-col"}
									elevation={0}
									style={{
										backgroundImage: `url("assets/images/primariaalta/cardDashboard.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundColor: 'transparent',
										borderColor: 'transparent'

									}}>

									<div className={clsx(classes.card)}>

										<div className="flex flex-wrap p-12 relative overflow-hidden flex-col w-full">

											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Badge badgeContent={pendientes ? pendientes.length : '0'} classes={{ badge: classes.customBadge }} showZero>
													<Icon className={clsx(classes.yellowIcons)} >error_outline</Icon>
												</Badge>
												<Typography className={clsx(classes.TextTitle)}>
													Pendientes
												</Typography>
											</div>

											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Badge badgeContent={entregadas ? entregadas.length : '0'} classes={{ badge: classes.customBadge }} showZero>
													<Icon className={clsx(classes.yellowIcons)} >check</Icon>
												</Badge>
												<Typography className={clsx(classes.TextTitle)}>
													Realizadas
												</Typography>
											</div>

											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Badge badgeContent={panelInfo ? panelInfo.score.length : '0'} classes={{ badge: classes.customBadge }} showZero>
													<Icon className={clsx(classes.yellowIcons)} >star</Icon>
												</Badge>
												<Typography className={clsx(classes.TextTitle)}>
													Calificadas
												</Typography>
											</div>

										</div>

										<div className="flex flex-wrap  w-full border-t-1 mt-60"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>

											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_mis-herramientas.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Button
													underline='hover'
													href="https://docs.google.com/spreadsheets/d/1vETNOINAFfoA_rLmTlEcFg1xRple3GLp4LuX1lwTZcU/edit#gid=743745254"
													target="_blank"
													disableRipple
													style={{
														backgroundColor: 'transparent',
														textTransform: 'none',
													}}
												>
													<Typography className={clsx(classes.TextChannel)}>
														Mis Herramientas
													</Typography>
												</Button>
											</div>
										</div>
										<div className="flex flex-wrap  w-full border-t-1 border-b-1"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>

											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_recursoslia.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Button
													href="https://docs.google.com/spreadsheets/d/1vETNOINAFfoA_rLmTlEcFg1xRple3GLp4LuX1lwTZcU/edit#gid=0"
													target="_blank"
													disableRipple
													style={{
														backgroundColor: 'transparent',
														textTransform: 'none',
													}}>
													<Typography className={clsx(classes.TextChannel)}>
														Mis Recursos Lia
													</Typography>
												</Button>

											</div>
										</div>

									</div>
								</Paper>
							</div>

							{/* -------------------------- Mi Mundo LIA ------------------------- */}
							<div className="flex w-full md:w-1/4 sm:w-1/2 flex-col items-center justify-center">

								<div className={classes.paperTitle}>

									<Link to="/loginp" className="items-center justify-center" >
										<img className={clsx(classes.img)} src={escuelabaja ? "assets/images/preescolar/comunicacion.png" : "assets/images/preescolar/islaMundoLIA.png"} />

										<div className="mb-16"
											style={{
												backgroundImage: `url("assets/images/primariaalta/Boton.png")`,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
											}}
										>
											<Typography className={clsx(classes.TextTitleAlta)}>
												{'Mi Mundo Lia'}
											</Typography>
										</div>
									</Link>
								</div>

								<Paper
									className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex flex-col"}
									elevation={0}
									style={{
										backgroundImage: `url("assets/images/primariaalta/cardDashboard.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundColor: 'transparent',
										borderColor: 'transparent'

									}}
								>


									<div className={clsx(classes.card)}>

										<div className="flex flex-wrap p-12 relative overflow-hidden flex-col w-full">
											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8 justify-center"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Link to="/loginp" onClick={ev => dispatch(setRedirect("misgrupos"))}>
													<Typography className={clsx(classes.TextTitle)}>
														Mis Grupos
													</Typography>
												</Link>
											</div>

											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8 justify-center"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Link onClick={ev => dispatch(openAvatarLayout())} >
													<Typography className={clsx(classes.TextTitle)}>
														Mi Avatar
													</Typography>
												</Link>
											</div>

											{/* <div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8 justify-center"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Link onClick={ev => dispatch(openAvatarLayout())} >
													<Typography className={clsx(classes.TextTitle)}>
														Calendario de eventos
													</Typography>
												</Link>
											</div> */}



										</div>

										<div className="flex flex-wrap  w-full border-t-1 mt-16"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clublia.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/loginp" onClick={ev => dispatch(setRedirect("onlinelia"))}>
													<Typography className={clsx(classes.TextChannel)}>
														Canal Online Lia
													</Typography>
												</Link>
											</div>
										</div>
										<div className="flex flex-wrap  w-full border-t-1 border-b-1"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_lia-u.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/logina" >
													<Typography className={clsx(classes.TextChannel)}>
														LIA U
													</Typography>
												</Link>
											</div>
										</div>

									</div>
								</Paper>
							</div>

							{/* -------------------------- Mis Clases ------------------------- */}

							<div className="flex w-full md:w-1/4 sm:w-1/2 flex-col items-center justify-center">

								<div className={classes.paperTitle}>

									<Link to="/apps/sections/calendario" className="items-center justify-center" >
										<img className={clsx(classes.img)} src={escuelabaja ? "assets/images/preescolar/artes.png" : "assets/images/preescolar/islaClases.png"} />

										<div className="mb-16"
											style={{
												backgroundImage: `url("assets/images/primariaalta/Boton.png")`,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
											}}
										>
											<Typography className={clsx(classes.TextTitleAlta)}>
												{'Mis Clases'}
											</Typography>
										</div>
									</Link>
								</div>

								<Paper
									className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex flex-col"}
									elevation={0}
									style={{
										backgroundImage: `url("assets/images/primariaalta/cardDashboard.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundColor: 'transparent',
										borderColor: 'transparent'

									}}
								>


									<div className={clsx(classes.card)}>

										<div className="flex flex-wrap p-12 relative overflow-hidden flex-col w-full mt-80">



										</div>

										<div className="flex flex-wrap  w-full border-t-1 border-b-1 mt-80"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clases-envivo.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/apps/aula" >
													<Typography className={clsx(classes.TextChannel)}>
														Clases en vivo
													</Typography>
												</Link>
											</div>
										</div>

									</div>
								</Paper>
							</div>

						</div>
					</FuseAnimateGroup>
				</div>
			);
		}
	}
}


export default withReducer('PreescolarApp', reducer)(MiScore);
