import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function RedirectPage() {
	const user = useSelector(({ auth }) => auth.user);
	const classes = useStyles();
	const data_url = user.data.username+'|'+user.data.uuid_;
	const encodedData = btoa(data_url);
	const url = 'http://plus.clublia.com/SSO?data='+encodedData;
	const role = useSelector(({ auth }) => auth.user.role);
	const grade = useSelector(({ auth }) => auth.user.grade);
	// const escuelabaja = role== 'alumno' && grade <= 3 ? true : false ; 

	// if(user.data.role == 'alumno' || user.data.role == 'alumno_secundaria' || user.data.role == 'alumnoe0' || user.data.role == 'preescolar' || user.data.role == 'padre' ){
	// 	return (<Redirect to="/loginp" />)
	// }else {
	if (  user.data.role == 'alumno_secundaria' || user.data.role == 'alumnoe0' || user.data.role == 'alumnoe1' || user.data.role == 'alumnoe2' || user.data.role == 'alumnoe3' || user.data.role == 'Alumno-I' || user.data.role == 'Alumno-M' || user.data.role == 'Alumno-A') {
		return (<Redirect to="/apps/dashboard/" />)
	} 
	if (user.data.role == 'preescolar' || user.data.role == 'alumno' ) {
		return (<Redirect to="/apps/landing" />)
	}
	else {
		return (<Redirect to="/pages/bienvenido" />)
	}
}

export default RedirectPage;
