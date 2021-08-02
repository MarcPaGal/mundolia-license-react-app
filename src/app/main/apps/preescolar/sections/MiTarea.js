import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from '@fuse/hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { getMiTarea, submitUploadFile } from '../store/miTarea';
import Dialog from '@material-ui/core/Dialog';
import Formsy from "formsy-react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { logoutUser } from 'app/auth/store/userSlice';
import { openAvatarLayout } from 'app/store/fuse/avatarSlice';
import { downloadFile } from 'app/main/apps/aulaVirtual/store/aulaSlice';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UserInfoHeader from '../components/UserInfoHeader';
import LogoutButton from '../components/LogoutButton';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		textTransform:"capitalize"
	},
	Text: {
		fontSize: "22px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextIcons: {
		fontSize: "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
		textAlign:"center",
		textTransform:"capitalize"
	},
	TextInfo: {
		fontSize: "16px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	LabelText: {
		fontSize: "26px",
		color: 'red',
	},
	LabelTextWhite: {
		fontSize: "26px",
		color: '#fff',
	},
	LabelDue: {
		fontSize: "45px",
		color: 'red',
		textAlign: "center",
		paddingTop: "25px",
	},
	LabelDesc: {
		fontSize: "28px",
		color: 'white',
		textShadow: '4px 4px 4px #595959',
	},
	LabelScore: {
		fontSize: "80px",
		color: 'red',
	},
	starIcon: {
		color: 'purple',
	},
	redIcon: {
		color: 'red',
	},
	whiteIcon: {
		color: '#fff',
	},
	button: {
		"&:hover": {
			transform: "scale(1.2) translateX(50px)"
			// width:"120%"
		},
		justifyContent:"left"
	},
	img: {
		maxHeight: "20%",
		maxWidth: "20%",
	},
	imgIcons: {
		width:"100%"
	},
	imgIconsFooter: {
		width:200,
		marginLeft:"3%",
		marginRight:"3%"
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
	containerFooter: {
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		width:"100%"
	},
	paperTitle: {
		marginTop: "-40px",
		paddingTop: "20px",
		height: "70px",
		width: "280px",
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
	containersInfo: {
		borderRadius: 5,
		width: '50px'
	},
	right: {
		// objectPosition: 'right',
		// display: 'flex',
		// flexDirection: "row-reverse"
		// maxHeight: '40px',
		justifyContent: "flex-end",
		alignItems: "flex-end",
		alignContent: "flex-end",
		textAlign: "right",
		alignSelf: 'flex-end',
		flexContainer: 'justify-end',
		paddingLeft: '70px',
		paddingRight: '70px',
	},
	userIcon: {
		// maxHeight: "50%",
		// maxWidth: "50%",
		display: 'flex',
		objectFit: 'cover',
		flexContainer: 'justify-end',
		justifyContent: "flex-end",
		alignItems: "flex-end",
		textAlign: "right",
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
		paddingLeft: '100px'

	},
	infoCardsColumn: {
		paddingTop: 12, 
		paddingBottom: 12, 
		paddingLeft: 5, 
		paddingRight: 5, 
		backgroundColor: '#ECA800', 
		color: '#FFFFFF',
		borderRadius: 15, 
		fontWeight: "bold", 
		width: 'full', 
		height: 'full', 
		textAlign: "center", 
		flex: 1, 
		borderColor: '#FFD90A', 
		borderWidth: 6,
	},
}));

function MiTarea(props) {

	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();

	const [fileName, setFileName] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileType, setFileType] = useState('file');
	const fileInput = useRef(null);
	const role = useSelector(({ auth }) => auth.user.role);
	const info = useSelector(({ auth }) => auth.user);
	const escuelabaja = role == 'alumno' && info.grade <= 3 ? true : false;
	const homework = useSelector(({ MiTareaApp }) => MiTareaApp.miTarea.data);
	const [userMenu, setUserMenu] = useState(null);

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
			'assets/images/preescolar/Mis-tareas-PLANETA.png'
		],
		island2: [
			'assets/images/preescolar/islaMundoLIA-1.png',
			'assets/images/preescolar/comunicacion-1.png',
			'assets/images/preescolar/Mi-mundo-LIA.png'
		],
		island3: [
			'assets/images/preescolar/islaClases-1.png',
			'assets/images/preescolar/artes-1.png',
			'assets/images/preescolar/Mis-clases.png'
		],

	}

	const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
	"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	];

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	useDeepCompareEffect(() => {
		dispatch(getMiTarea(routeParams));
	}, [dispatch, routeParams]);

	function handleSubmit() {
        dispatch(submitUploadFile(routeParams, homework, selectedFile, fileType));
		setSelectedFile(null)
	}
	
	function getPreeStarsIcons(stars){
		return (
			<div>
				<Icon className={clsx(classes.starIcon,"text-center text-40 font-600 mt-4 ml-4")}>star</Icon>
				<Icon className={clsx(classes.starIcon,"text-center text-40 font-600 mt-4 ml-4")}>star</Icon>
				<Icon className={clsx(classes.starIcon,"text-center text-40 font-600 mt-4 ml-4")}>star</Icon>
				<Icon className={clsx(classes.starIcon,"text-center text-40 font-600 mt-4 ml-4")}>{stars > 3 ? 'star' : 'star_border'}</Icon>
				<Icon className={clsx(classes.starIcon,"text-center text-40 font-600 mt-4 ml-4")}>{stars > 4 ? 'star' : 'star_border'}</Icon>
			</div>									
		);
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
							}}
							to={`/apps/sections/mistareas`}
							component={Link}
							type="button"
						>
							<img className={clsx(classes.img)} src={ theme.island1[nivel] } />
							<Typography className={clsx(classes.TextTitle)}>	
								{escuelabaja ? 'Mis Tareas' : 'Mis Actividades'}
							</Typography>
						</Button>
					</div>


					{/* ------------------------- Avatar and User Info --------------------- */}
					<div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row">
						<UserInfoHeader/>
					</div>
				</div>
				{
					homework ?

						<Grid container className="flex flex-row m-20" spacing={0}>
							{/* -------------------------- grid for islands ------------------------- */}
							<Grid item xs={1} className="flex">
								<Grid container className="flex w-full flex-col" spacing={1}>
									<Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
										<Button 
										onClick={ev => dispatch(openAvatarLayout())}>
											{/* to={`/apps/aula`} component={Link} type="button"> */}
											<div  className="flex flex-col">
												<img className={clsx(classes.imgIcons,"flex w-full")} src="assets/images/preescolar/Mi-avatar-1.png" />
												<Typography className={clsx(classes.TextIcons)}>
													Mi Avatar
												</Typography>
											</div>
										</Button>
									</Grid>
									<Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
										<Button
											to={`/loginp`} component={Link} type="button">
											<div  className="flex flex-col">
												<img className={clsx(classes.imgIcons,"flex w-full")} src={ theme.island2[nivel] } />
												<Typography className={clsx(classes.TextIcons)}>
													Mi Mundo Lia
												</Typography>
											</div>
										</Button>
									</Grid>
									<Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
										<Button
											to={`/apps/sections/calendario`} component={Link} type="button">
											<div  className="flex flex-col">
												<img className={clsx(classes.imgIcons,"flex w-full")} src={ theme.island3[nivel] } />
												<Typography className={clsx(classes.TextIcons)}>
													Mis Clases
												</Typography>
											</div>
										</Button>
									</Grid>
								</Grid>
							</Grid>
							{/* -------------------------- grid to cards ------------------------- */}
							<Grid item xs={11} className="flex w-full items-center flex-wrap">
								<Grid container className="flex flex-col flex-wrap items-center pt-28 pb-28 pr-20 w-full" spacing={0}>
									
									<Grid item xs={12} className="flex w-full items-center">
										<Grid container className="flex items-center w-full justify-center flex-row" spacing={0}>
											<Grid item xs className="flex items-center justify-center flex-col max-w-400 m-20 mb-40">
												{/* -------------------------- tasks undelivered ------------------------- */}
												<Paper
													className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col mb-20"}
													elevation={3}

													style={{
														backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/Back-tareas.png' : 'assets/images/preescolar/Back-tareas.png'})`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
														backgroundColor: 'transparent',
													}}>

													<div className={clsx(classes.paperTitle)}
														style={{
															backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/tituloback.png' : 'assets/images/preescolar/tituloback.png'} )`,
															backgroundPosition: 'center',
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
														}}
													>
														<Typography className={clsx(classes.Text)}>
															Materia
														</Typography>
													</div>
													{/* ----------------------------Info inside card-------------------------- */}
													<div
														className="flex items-center justify-center w-full"
														style={{
															height: 110,
															paddingLeft: 45,
															paddingRight: 45,
														}}
													>
														<div
															className="w-full"
															style={ nivel == 2 ? {
																	paddingLeft: 5, 
																	paddingRight: 5,	
																	paddingTop: 2, 
																	paddingBottom: 2,								
																	borderRadius: 30, 
																	textAlign: "center", 
																	background: 'rgb(0,58,131,203)',
																	background: 'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																} : {
																	backgroundColor: '#FFFFFF',
																	paddingLeft: 5,
																	paddingRight: 5,
																	paddingTop: 2,
																	paddingBottom: 2,
																	borderRadius: 30,
																	textAlign: "center",
																}
															}
														>
															<Typography className={nivel == 2 ? clsx(classes.LabelTextWhite) : clsx(classes.LabelText)}>
																{homework.custom_name}
															</Typography>
														</div>
													</div>
												</Paper>
												<Paper
													className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col"}
													elevation={3}

													style={{
														backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/Back-tareas.png' : 'assets/images/preescolar/Back-tareas.png'})`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
														backgroundColor: 'transparent'
													}}>
													{/* ----------------------------Info inside card-------------------------- */}
													<div
														className="flex flex-col items-center w-full"
														style={{
															height: 300,
															paddingTop: 10,
															paddingLeft: 40,
															paddingRight: 40,
														}}
													>
														<Typography className={clsx(classes.LabelDesc)}>
															Descripción
														</Typography>
														

														{
															homework.instructions ?
																<div
																	className="w-full"
																	style={{
																		marginTop: 20,
																		height: 200,
																		overflowY: 'scroll',
																		color: 'white',
																		padding: 10,
																		fontSize: 20,
																	}}
																>
																	{homework.instructions}
																</div>
																:
																<div className="flex items-center justify-center h-200 text-center">
																	<Typography className={clsx(classes.TextInfo)}>
																		No hay instrucciones
																	</Typography>
																</div>
														}
													</div>
												</Paper>
											</Grid>
											{/* -------------------------- tasks delivered ------------------------- */}
											<Grid item xs className="flex items-center justify-center flex-col max-w-400 m-20 mb-40">
												<Paper
													className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col mb-20"}
													elevation={3}

													style={{
														backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/Back-tareas.png' : 'assets/images/preescolar/Back-tareas.png'})`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
														backgroundColor: 'transparent',
													}}>

													<div className={clsx(classes.paperTitle)}
														style={{
															backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/tituloback.png' : 'assets/images/preescolar/tituloback.png'})`,
															backgroundPosition: 'center',
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
														}}
													>
														<Typography className={clsx(classes.Text)}>
															Vencimiento
														</Typography>
													</div>
													{/* ----------------------------Info inside card-------------------------- */}
													<div
														className="flex items-center justify-center w-full"
														style={{
															
															height: 85,
															paddingLeft: 45,
															paddingRight: 45,
														}}
													>

														<div
															className="flex items-center flex-col"
															style={{
																backgroundImage: 'url(assets/images/primaria-alta/calendario.png)',
																backgroundPosition: 'center',
																backgroundSize: 'contain',
																backgroundRepeat: 'no-repeat',
																//backgroundColor: '#FFFFFF',
																backgroundColor: 'transparent',
																height: 90,
																width: 95,
																borderRadius: 5,
																position: 'relative',
															}}
														>
															{/* <div
																className="w-full"
																style={{
																	backgroundColor: 'red',
																	height: 25,
																	borderTopLeftRadius: 5,
																	borderTopRightRadius: 5,
																}}
															>
															</div>
															<div
																style={{
																	position: 'absolute',
																	width: 60,
																	height: 15,
																	border: '3px solid #999',
																	borderWidth: '0 5px',
																	background: 'transparent',
																	top: '-6px',
																}}>
															</div> */}
															<Typography className={clsx(classes.LabelDue)}>
																{new Date(homework.finish_date).getDate()}
															</Typography>
														</div>
													</div>
													<Typography className={clsx(classes.TextInfo)}>
														{monthNames[new Date(homework.finish_date).getMonth()]}
													</Typography>
												</Paper>
												<Paper
													className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col"}
													elevation={3}

													style={{
														backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/Back-tareas.png' : 'assets/images/preescolar/Back-tareas.png'})`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
														backgroundColor: 'transparent',
													}}>
													{/* ----------------------------Info inside card-------------------------- */}
													{
														homework.status == 'Calificado' ?
															<div 
																className="flex items-center justify-center text-center"
																style={{
																	height: 300,
																}}
															>
																<Typography className={clsx(classes.TextInfo)}>
																	La tarea ya fue calificada
																</Typography>
															</div>
															:

															<div
																className="flex flex-col items-center w-full"
																style={{
																	height: 300,
																	paddingLeft: 45,
																	paddingRight: 45,
																}}
															>
																<Formsy
																	onValidSubmit={handleSubmit}
																	// onChange={validateForm}
																	// onValid={enableButton}
																	// onInvalid={disableButton}
																	// ref={formRef}
																	className="flex flex-col w-full items-center mt-20"
																>
																	{ nivel == 2 ?
																		<DialogContent className="w-full items-center">
																			<Button
																				className="w-full"
																				style={{
																					paddingLeft: 5, 
																					paddingRight: 5,	
																					paddingTop: 2, 
																					paddingBottom: 2,								
																					borderRadius: 30, 
																					textAlign: "center", 
																					background: 'rgb(0,58,131,203)',
																					background: 'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																				}}
																			>
																				<Typography className={clsx(classes.LabelTextWhite)}>
																					Realizar
																				</Typography>
																				<img 
																					src="assets/images/primaria-alta/realizarIcon.png" 
																					style={{
																						paddingLeft: 5,
																						height: '40px' 
																					}}
																				/>
																			</Button>
																		</DialogContent>
																	:
																		null
																	}
																	<DialogContent className="w-full items-center">
																		<Button
																			className="w-full"
																			style={ nivel == 2 ? {
																					paddingLeft: 5, 
																					paddingRight: 5,	
																					paddingTop: 2, 
																					paddingBottom: 2,								
																					borderRadius: 30, 
																					textAlign: "center", 
																					background: 'rgb(0,58,131,203)',
																					background: 'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																				} : {
																					backgroundColor: '#FFFFFF',
																					paddingLeft: 5,
																					paddingRight: 5,
																					paddingTop: 10,
																					paddingBottom: 2,
																					borderRadius: 30,
																					textAlign: "center",
																				}
																			}
																			onClick={e => fileInput.current && fileInput.current.click()}
																		>
																			<Typography className={nivel == 2 ? clsx(classes.LabelTextWhite) : clsx(classes.LabelText)}>
																				Adjuntar
																			</Typography>
																			{ nivel == 2 ?
																				<img 
																					src="assets/images/primaria-alta/adjuntarIcon.png" 
																					style={{
																						paddingLeft: 5,
																						height: '40px' 
																					}}
																				/>
																			:
																				<Icon className={clsx( (nivel == 2 ? classes.whiteIcon : classes.redIcon ) ,"text-center text-40 font-600 ml-4")}>description</Icon>
																			}
																			</Button>
																		<input
																			type="file"
																			name="file"
																			id="file"
																			onChange={(e) => {
																				setFileName(e.target.files[0].name);
																				setSelectedFile(e.target.files[0]);
																			}}
																			// onChange={handleChange}
																			ref={fileInput}
																			hidden
																		/>
																	</DialogContent>
																	{fileName !== '' &&
																		<Typography
																			className={clsx(classes.TextInfo)}
																			style={{
																				width: '100%',
																				overflowX: 'auto',
																				whiteSpace: 'nowrap',
																				height: 50,
																				padding: 5,
																			}}
																		>
																			{fileName == '' ? homework.file_path ? homework.file_path.slice(homework.file_path.indexOf('_')+1) : fileName : fileName}
																		</Typography>
																	}
																	<DialogActions className="w-full mt-20">
																		<Button
																			className="w-full"
																			style={ nivel == 2 ? {
																					paddingLeft: 5, 
																					paddingRight: 5,	
																					paddingTop: 2, 
																					paddingBottom: 2,								
																					borderRadius: 30, 
																					textAlign: "center", 
																					background: 'rgb(0,58,131,203)',
																					background: 'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																				} : {
																					backgroundColor: '#FFFFFF',
																					paddingLeft: 5,
																					paddingRight: 5,
																					paddingTop: 2,
																					paddingBottom: 2,
																					borderRadius: 30,
																					textAlign: "center",
																				}
																			}
																			uppercase='false'
																			// onClick={handleSubmit}
																			type="submit"
																			disabled={!selectedFile}
																		>
																			<Typography className={nivel == 2 ? clsx(classes.LabelTextWhite) : clsx(classes.LabelText)}>
																				Enviar
																			</Typography>
																			{ nivel == 2 ?
																				<img 
																					src="assets/images/primaria-alta/enviarIcon.png" 
																					style={{
																						paddingLeft: 5,
																						height: '40px' 
																					}}
																				/>
																			:
																				<Icon className={clsx( (nivel == 2 ? classes.whiteIcon : classes.redIcon ) ,"text-center text-40 font-600 ml-4")}>send</Icon>
																			}
																		</Button>
																	</DialogActions>
																</Formsy>
															</div>
													}

												</Paper>
											</Grid>
											{/* -------------------------- tasks delivered ------------------------- */}
											<Grid item xs className="flex items-center flex-col max-w-400 m-20 mb-40">
												<Paper
													className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col mb-20"}
													elevation={3}

													style={{
														backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/Back-tareas.png' : 'assets/images/preescolar/Back-tareas.png'})`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
														backgroundColor: 'transparent',
													}}>

													<div className={clsx(classes.paperTitle)}
														style={{
															backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/tituloback.png' : 'assets/images/preescolar/tituloback.png'})`,
															backgroundPosition: 'center',
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
														}}
													>
														<Typography className={clsx(classes.Text)}>
															Estatus
														</Typography>
													</div>
													<div
														className="flex items-center justify-center w-full"
														style={{
															height: 110,
															paddingLeft: 45,
															paddingRight: 45,
														}}
													>
														<div
															className="w-full"
															style={ nivel == 2 ? {
																	paddingLeft: 5, 
																	paddingRight: 5,	
																	paddingTop: 2, 
																	paddingBottom: 2,								
																	borderRadius: 30, 
																	textAlign: "center", 
																	background: 'rgb(0,58,131,203)',
																	background: 'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																	/* backgroundImage: `url(assets/images/primaria-alta/Materias-DESPLIEGUE.png)`,
																	backgroundPosition: 'center',
																	backgroundSize: '250px 50px',
																	backgroundRepeat: 'no-repeat',
																	backgroundColor: 'transparent',
																	textAlign: "center", */
																} : {
																	backgroundColor: '#FFFFFF',
																	paddingLeft: 5,
																	paddingRight: 5,
																	paddingTop: 10,
																	paddingBottom: 2,
																	borderRadius: 30,
																	textAlign: "center",
																}
															}
														>
															<Typography className={nivel == 2 ? clsx(classes.LabelTextWhite) : clsx(classes.LabelText)}>
																{homework.status}
															</Typography>
														</div>
													</div>
													{/* ----------------------------Info inside card-------------------------- */}

												</Paper>
												<Paper
													className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col"}
													elevation={3}

													style={{
														backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/Back-tareas.png' : 'assets/images/preescolar/Back-tareas.png'})`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
														backgroundColor: 'transparent',
													}}>
													{/* ----------------------------Info inside card-------------------------- */}
													<div
														className="flex items-center w-full flex-col"
														style={{
															height: 300,
															paddingTop: 10,
															paddingLeft: 45,
															paddingRight: 45,
														}}
													>
														<Typography className={clsx(classes.LabelDesc)}>
															Calificación
														</Typography>
														{
															homework.status == 'Calificado' ?
															    (escuelabaja ? 
																	<div
																		style={{
																			marginTop: 40,
																			backgroundColor: '#FFFFFF',
																			paddingLeft: 25,
																			paddingRight: 25,
																			borderRadius: 10,
																		}}
																	>
																		<Typography className={clsx(classes.LabelScore)}>
																			{homework.score.slice(homework.score.indexOf('.')) == '.00' ? homework.score.slice(0, homework.score.indexOf('.')) : homework.score}
																		</Typography>
																	</div>
																	:
																	
																	<Typography className={clsx(classes.LabelScore)}>
																		{getPreeStarsIcons(homework.preeStars)}
																	</Typography>
																)
																:
																<div className="flex items-center justify-center h-200 text-center">
																	<Typography className={clsx(classes.TextInfo)}>
																		Esta tarea aún no tiene calificación
																	</Typography>
																</div>
														}
													</div>
												</Paper>
											</Grid>
										</Grid>
									</Grid>

									<Grid item xs xl={10} className="flex h-full w-full p-16">
										<div
											className= "flex"

											style={{
												backgroundImage: `url(${nivel == 2 ? 'assets/images/primaria-alta/Back-iconos.png' : 'assets/images/preescolar/Back-iconos.png'})`,
												backgroundPosition: 'center',
												backgroundSize: 'cover',
												backgroundRepeat: 'no-repeat',
												borderRadius:8,
												width:"100%",
												justifyContent:"center"

											}}>
											{/* ----------------------------Info inside card-------------------------- */}
											{homework.activityFile && Array.isArray(homework.activityFile) && 
												homework.activityFile.map((uFile) => (
													<div className={clsx(classes.imgIconsFooter,"flex pt-20 pb-20 justify-center")}>
														<Button className="flex w-full"
															onClick={ev => {
																ev.stopPropagation();
																console.log("ufile::",uFile,uFile.split('.')[uFile.split('.').length-1]);
																dispatch(downloadFile(uFile.replace('public','')));}}>
															<img src={"assets/images/logos/" + 
																((uFile.split('.')[uFile.split('.').length-1] == "jpg" || uFile.split('.')[uFile.split('.').length-1] == "png" || uFile.split('.')[uFile.split('.').length-1] == "svg" || uFile.split('.')[uFile.split('.').length-1] == "ico" ) ? 
																	"image.png" :
																((uFile.split('.')[uFile.split('.').length-1] == "mp4" || uFile.split('.')[uFile.split('.').length-1] == "gif" || uFile.split('.')[uFile.split('.').length-1] == "mpg" || uFile.split('.')[uFile.split('.').length-1] == "3gp" || uFile.split('.')[uFile.split('.').length-1] == "avi" || uFile.split('.')[uFile.split('.').length-1] == "wmv" ) ? 
																	"video.png" :
																(uFile.split('.')[uFile.split('.').length-1] == "docx" ?
																	"word.svg" :
																(uFile.split('.')[uFile.split('.').length-1] == "xlsx" ?
																	"excel.svg" :
																(uFile.split('.')[uFile.split('.').length-1] == "pptx" ?
																	"powerpoint.svg" :
																(uFile.split('.')[uFile.split('.').length-1] == "pdf" ?
																	"pdf.png" :
																	"fuse.svg"))))))} />
														</Button>
													</div>
												))
											}
										</div>
									</Grid>

								</Grid>
							</Grid>
							{/* --------------- logout --------------- */}
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
						</Grid>
						:
						null
				}
					
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('MiTareaApp', reducer)(MiTarea);
