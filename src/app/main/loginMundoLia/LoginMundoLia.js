import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import {showMessage} from "../../store/fuse/messageSlice";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
	root_alumnos: {
		backgroundImage: "url(assets/images/login/bg_alumnos.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_maestros: {
		backgroundImage: "url(assets/images/login/bg_maestros.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_padres: {
		backgroundImage: "url(assets/images/login/bg_padres.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_escuelas: {
		backgroundImage: "url(assets/images/login/bg_escuelas.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},

	image_overlay_alumnos:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(148,88,183,0.8)',},
	image_overlay_maestros:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgb(208,66,55,0.7)',},
	image_overlay_padres:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(231,162,63,0.7)',},
	image_overlay_escuelas:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(34,79,245,0.7)',},
	
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function signInWithToken(){
	var jwt = localStorage.getItem('jwt_access_token');
	window.location.href = ('http://juegos-test.clublia.com?token='+jwt);
};


function LoginMundoLia() {
	const classes = useStyles();
	signInWithToken();
	const userType = useSelector(({ auth }) => auth.user.role);

	return (
		<div
		className={clsx((userType == "admin" || userType == "alumno"|| userType == "preescolar") ? classes.root_alumnos : userType == "maestro" ? classes.root_maestros : userType === "padre" ? classes.root_padres :classes.root_escuelas,
			'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
		)}
	>
		<div className={clsx((userType == "admin" || userType == "alumno"|| userType == "preescolar") ? classes.image_overlay_alumnos : userType == "maestro" ? classes.image_overlay_maestros : userType === "padre" ? classes.image_overlay_padres :classes.image_overlay_escuelas)}/>
			<FuseAnimate animation="transition.expandIn">
				<div className={clsx("flex w-full max-w-400 md:max-w-3xl rounded-12 overflow-hidden justify-center")}>
				
					<img className="logo-icon w-49" src="assets/images/logos/clublia.png" alt="logo" />
									
				</div>

			</FuseAnimate>
					<CircularProgress color="secondary" />
		</div>
	);
}

export default LoginMundoLia;
