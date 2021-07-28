import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from './store';
import Calendar from "@ericz1803/react-google-calendar";
import { openTokenDialog, closeTokenDialog } from './store/tokenSlice';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import { googleSigIn } from './store/tokenSlice';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function EventsCalendarTokenDialog(props) {

    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const token = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.token.token);
    const tokenDialog = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.token.tokenDialog);

    useEffect(() => {
		if(token == 'notLogged'){
		    console.log('entra')
            dispatch(openTokenDialog());
        } else {
		    console.log(token)
		    console.log('no entra')
            dispatch(closeTokenDialog());
        }
	},[dispatch, token]);

    function closeComposeDialog() {
		return dispatch(closeTokenDialog());
	}

    return (
        <div>
            <Dialog
                classes={{
                    paper: 'm-24 rounded-8'
                }}
                {...tokenDialog.props}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            Ingresa con Google
                        </Typography>
                    </Toolbar>
                        
                </AppBar>
                <DialogContent classes={{ root: 'p-24' }}>
                    <DialogContentText id="alert-dialog-slide-description" className="mb-16 p-16">
                        Es necesario ingresar con una cuenta de google para hacer uso de las funciones del calendario.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="justify-between p-16">
						<div className="px-16">
							<Button
								variant="contained"
								color="default"
								type="submit"
                                to={`/pages/bienvenido`}
								component={Link}
							>
								Cancelar
							</Button>
						</div>
                        <div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
                                onClick={() => window.location.href = process.env.REACT_APP_API+'/login/google/redirect/'+user.uuid}
							>
								Aceptar
							</Button>
						</div>
					</DialogActions> 
            </Dialog>
        </div>
    );
}
export default EventsCalendarTokenDialog;