import Icon from '@material-ui/core/Icon';
import React, { useCallback, useEffect, useRef, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCalendarDialog } from './store/calendarSlice';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from "@material-ui/core/MenuItem";
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextFieldFormsy } from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import { showMessage } from "../../../store/fuse/messageSlice";
import { useForm } from '@fuse/hooks';
import InputAdornment from '@material-ui/core/InputAdornment';
import FuseUtils from '@fuse/utils/FuseUtils';
import { submitCreateCalendar } from './store/calendarSlice';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const defaultFormState = {
    subject_id: '',

};

function EventsCalendarDialog(props) {

    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const calendarDialog = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.calendarDialog);
    const calendar = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.calendar);
    const subjects = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.subjects.data.nonCalendars);
    const group = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.group);
    const formOrigin = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.calendarDialog.data);
    const { form, handleChange, setForm } = useForm(defaultFormState);

    const [values, setValues] = React.useState({
        // showPassword: false,
        loading: false
    });
    const [isFormValid, setIsFormValid] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);
    const formRef = useRef(null);


    function disableButton() {
        setIsFormValid(false);
    }

    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'new'
         */
        if (calendarDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...calendarDialog.data,
                id: FuseUtils.generateGUID()
            });
        }
    }, [calendarDialog.data, calendarDialog.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (calendarDialog.props.open) {
            initDialog();
        }
    }, [calendarDialog.props.open, initDialog]);

    useEffect(() => {
        if (calendar.error) {
            disableButton();
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Error al crear el calendario!', variant: 'error' }));
        }

        if (calendar.success) {
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));

            closeComposeDialog();
        }
    }, [calendar.error, calendar.success]);

    function closeComposeDialog() {
        return dispatch(closeCalendarDialog());
        // return  dispatch(closeCalendarDialog());
    }

    function handleSubmit(event) {
        setValues({ ...values, loading: true });
        event.preventDefault();

        if (calendarDialog.type === 'new') {
            dispatch(submitCreateCalendar(form, group.group));
        }
    }

    function enableButton() {
        setIsFormValid(true);
    }
    function validateForm(values) {
        setForm(values);
    }

    return (
        <div>
            <Dialog
                classes={{
                    paper: 'm-24 rounded-8'
                }}
                {...calendarDialog.props}
                fullWidth
                maxWidth="xs"
                onClose={closeComposeDialog}
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            Nuevo Calendario
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Formsy
                    onValidSubmit={handleSubmit}
                    onChange={validateForm}
                    onValid={enableButton}
                    onInvalid={disableButton}
                    ref={formRef}
                    className="flex flex-col md:overflow-hidden"
                >
                    <DialogContent classes={{ root: 'p-24' }}>
                        {
                            subjects && subjects.length ?
                                <SelectFormsy
                                    id="subject_id"
                                    name="subject_id"
                                    width="100%"
                                    value={form.subject_id}
                                    onChange={handleChange}
                                    label="Materia"
                                    fullWidth
                                    variant="outlined"
                                    className="mb-24 MuiInputBase-fullWidth"
                                    required
                                >
                                    {subjects.map((row) => (
                                        <MenuItem key={row.id} value={row.id}>{row.custom_name}</MenuItem>
                                    ))
                                    }
                                </SelectFormsy>
                                :
                                <DialogContentText id="alert-dialog-slide-description" className="mb-16 p-16">
                                    No hay materias para crear calendarios.
                                </DialogContentText>
                        }
                    </DialogContent>

                    {values.loading && <LinearProgress />}

                    <DialogActions className="justify-between p-8">
                        <div className="px-16">
                            {
                                subjects && subjects.length ?
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={(values.loading || !isFormValid)}
                                    >
                                        Agregar
							        </Button>
                                    : 
                                    null
                            }

                        </div>
                    </DialogActions>
                </Formsy>
            </Dialog>
        </div>
    );
}
export default EventsCalendarDialog;