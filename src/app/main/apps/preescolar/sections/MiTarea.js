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

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
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
		textAlign:"center"
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
	LabelDue: {
		fontSize: "45px",
		color: 'red',
		textAlign: "center",
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
		alignContent: 'flex-end',
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
		alignContent: "flex-end",
		textAlign: "right",
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
		paddingLeft: '100px'

	},
	infoCardsColumn: {
		paddingTop: 12, paddingBottom: 12, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ECA800', color: '#FFFFFF',
		borderRadius: 15, fontWeight: "bold", width: 'full', height: 'full', textAlign: "center", flex: 1, borderColor: '#FFD90A', borderWidth: 6,
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
	console.log("fileInput::",fileInput);
	const role = useSelector(({ auth }) => auth.user.role);
	const info = useSelector(({ auth }) => auth.user);
	const escuelabaja = role == 'alumno' && info.grade <= 3 ? true : false;
	const homework = useSelector(({ MiTareaApp }) => MiTareaApp.miTarea.data);
	const [userMenu, setUserMenu] = useState(null);

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

	return (
		<div
			className="flex-1"
			style={{
				backgroundImage: `url("assets/images/preescolar/pantalla12.png")`,
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
							<img className={clsx(classes.img)} src="assets/images/preescolar/explorer.png" />
							<Typography className={clsx(classes.TextTitle)}>
								Mis Tareas
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
												<img className={clsx(classes.imgIcons,"flex w-full")} src="assets/images/preescolar/comunicacion-1.png" />
												<Typography className={clsx(classes.TextIcons)}>
													Mi Mundo Lia
												</Typography>
											</div>
										</Button>
									</Grid>
									<Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
										<Button
											to={`/apps/aula`} component={Link} type="button">
											<div  className="flex flex-col">
												<img className={clsx(classes.imgIcons,"flex w-full")} src="assets/images/preescolar/artes-1.png" />
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
														backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',

													}}>

													<div className={clsx(classes.paperTitle)}
														style={{
															backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
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
															style={{
																backgroundColor: '#FFFFFF',
																paddingLeft: 5,
																paddingRight: 5,
																paddingTop: 2,
																paddingBottom: 2,
																borderRadius: 30,
																textAlign: "center",
															}}
														>
															<Typography className={clsx(classes.LabelText)}>
																{homework.custom_name}
															</Typography>
														</div>
													</div>
												</Paper>
												<Paper
													className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col"}
													elevation={3}

													style={{
														backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',

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
																		backgroundColor: 'rgba(0, 0, 0, .1)',
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
														backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',

													}}>

													<div className={clsx(classes.paperTitle)}
														style={{
															backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
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
																backgroundColor: '#FFFFFF',
																height: 90,
																width: 95,
																borderRadius: 5,
																position: 'relative',
															}}
														>

															<div
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

															</div>
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
														backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',

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
																	<DialogContent className="w-full items-center">
																		<Button
																			className="w-full"
																			style={{
																				backgroundColor: '#FFFFFF',
																				paddingLeft: 5,
																				paddingRight: 5,
																				paddingTop: 10,
																				paddingBottom: 2,
																				borderRadius: 30,
																				textAlign: "center",
																			}}
																			onClick={e => fileInput.current && fileInput.current.click()}
																		>
																			<Typography className={clsx(classes.LabelText)}>
																				Adjuntar
																			</Typography>
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
																			style={{
																				backgroundColor: '#FFFFFF',
																				paddingLeft: 5,
																				paddingRight: 5,
																				paddingTop: 2,
																				paddingBottom: 2,
																				borderRadius: 30,
																				textAlign: "center",
																			}}
																			uppercase='false'
																			// onClick={handleSubmit}
																			type="submit"
																			disabled={!selectedFile}
																		>
																			<Typography className={clsx(classes.LabelText)}>
																				Enviar
																			</Typography>
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
														backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',

													}}>

													<div className={clsx(classes.paperTitle)}
														style={{
															backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
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
															style={{
																backgroundColor: '#FFFFFF',
																paddingLeft: 5,
																paddingRight: 5,
																paddingTop: 2,
																paddingBottom: 2,
																borderRadius: 30,
																textAlign: "center",
															}}
														>
															<Typography className={clsx(classes.LabelText)}>
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
														backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',

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

									<Grid item xs={10} className="flex h-full w-full">
										<div
											className= "flex"

											style={{
												backgroundImage: `url("assets/images/preescolar/Back-iconos.png")`,
												backgroundPosition: 'center',
												backgroundSize: 'cover',
												backgroundRepeat: 'no-repeat',
												borderRadius:8,
												width:"100%"

											}}>
											{/* ----------------------------Info inside card-------------------------- */}
											<div
												className={clsx(classes.imgIconsFooter,"flex pt-20 pb-20")}>
												<Button  
													onClick={ev => {
                                                        ev.stopPropagation();
                                                        homework.activityFile !== null && dispatch(downloadFile(homework.activityFile));}}>
													<img src="assets/images/logos/firebase.svg" />
												</Button>
											</div>
											<div
												className={clsx(classes.imgIconsFooter,"flex pt-20 pb-20")}>
												<img src="assets/images/logos/fuse.svg" />
											</div>
											<div
												className={clsx(classes.imgIconsFooter,"flex pt-20 pb-20")}>
												<img src="assets/images/logos/google-drive.svg" />
											</div>
											<div
												className={clsx(classes.imgIconsFooter,"flex pt-20 pb-20")}>
												<img src="assets/images/logos/google-slides.svg" />
											</div>
											<div
												className={clsx(classes.imgIconsFooter,"flex pt-20 pb-20")}>
												<img src="assets/images/logos/google-forms.svg" />
											</div>
											<div
												className={clsx(classes.imgIconsFooter,"flex pt-20 pb-20")}>
												<img src="assets/images/logos/google-meet.svg" />
											</div>
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
