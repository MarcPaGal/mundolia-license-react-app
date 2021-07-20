import Icon from '@material-ui/core/Icon';
import React, { useCallback, useEffect, useRef, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeEventDialog } from './store/eventsSlice';
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
import { TextFieldFormsy, CheckboxFormsy } from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { showMessage } from "../../../store/fuse/messageSlice";
import { useForm } from '@fuse/hooks';
import InputAdornment from '@material-ui/core/InputAdornment';
import FuseUtils from '@fuse/utils/FuseUtils';
import { submitEvent } from './store/eventsSlice';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const defaultFormState = {
    id: '',
    description: '',
    week: false
};

function EventsCalendarEventDialog(props) {

    const dispatch = useDispatch();
    const eventDialog = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.event.eventDialog);
    const event = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.event.event);
    const subjects = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.subjects.data.calendars);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    var startDate = null ;
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    var today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2)
	+ 'T' + ('0'+( today.getHours() + 1)).slice(-2) + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

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
        if (eventDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...eventDialog.data,
                id: FuseUtils.generateGUID()
            });
        }
    }, [eventDialog.data, eventDialog.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (eventDialog.props.open) {
            initDialog();
        }
    }, [eventDialog.props.open, initDialog]);

    useEffect(() => {

        startDate = new Date(selectedDate);
        setSelectedStartDate(startDate);
        setSelectedEndDate(startDate);

    }, [selectedDate]);

    useEffect(() => {
        if (event.error) {
            disableButton();
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Error al crear el evento!', variant: 'error' }));
        }

        if (event.success) {
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));

            closeComposeDialog();
        }
    }, [event.error, event.success]);

    function closeComposeDialog() {
        return dispatch(closeEventDialog());
        // return  dispatch(closeEventDialog());
    }

    function handleSubmit(event) {
        setValues({ ...values, loading: true });
        event.preventDefault();

        if (eventDialog.type === 'new') {
            dispatch(submitEvent(form, selectedDate, selectedStartDate, selectedEndDate, week, days));
        }
    }

    function enableButton() {
        setIsFormValid(true);
    }
    function validateForm(values) {
        setForm(values);
    }



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleStartChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndChange = (date) => {
        setSelectedEndDate(date);
    };

    const [week, setWeek] = useState(false);

    const handleChangeWeek = () => {
        setWeek(!week)
    };

    const [days, setDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
      });

      const handleChangeDays = (event) => {
        setDays({ ...days, [event.target.name]: event.target.checked });
      };

    return (
        <div>
            <Dialog
                classes={{
                    paper: 'm-24 rounded-8'
                }}
                {...eventDialog.props}
                fullWidth
                maxWidth="xs"
                onClose={closeComposeDialog}
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            Nuevo Evento
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
                                <>
                                    <SelectFormsy
                                        id="id"
                                        name="id"
                                        width="100%"
                                        // value={form.id}
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
                                    <TextFieldFormsy
                                        fullWidth
                                        multiline
                                        rows={4}
                                        className="mb-16"
                                        type="text"
                                        name="description"
                                        label="Descripción"
                                        id="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        variant="outlined"
                                        validations={{
                                            maxLength: 100
                                        }}
                                        validationErrors={{
                                            maxLength: 'El máximo de carácteres permitidos es 100'
                                        }}
                                    />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <div
                                            className="w-full items-center pl-10 pr-10"
                                        >
                                            { week ?
                                                <div
                                                    className="flex-col w-full items-center"
                                                >
                                                    <CheckboxFormsy
                                                        name="mon"
                                                        value={days.mon}
                                                        label="L"
                                                        onChange={handleChangeDays}
                                                    />
                                                    <CheckboxFormsy
                                                        name="tue"
                                                        value={days.tue}
                                                        label="M"
                                                        onChange={handleChangeDays}
                                                    />
                                                    <CheckboxFormsy
                                                        name="wed"
                                                        value={days.wed}
                                                        label="M"
                                                        onChange={handleChangeDays}
                                                    />
                                                    <CheckboxFormsy
                                                        name="thu"
                                                        value={days.thu}
                                                        label="J"
                                                        onChange={handleChangeDays}
                                                    />
                                                    <CheckboxFormsy
                                                        name="fri"
                                                        value={days.fri}
                                                        label="V"
                                                        onChange={handleChangeDays}
                                                    />
                                                </div>
                                                :
                                                <KeyboardDatePicker
                                                    fullWidth
                                                    disableToolbar
                                                    variant="inline"
                                                    format="yyyy-MM-dd"  
                                                    className="mb-16"
                                                    name="start"
                                                    label="Fecha"
                                                    id="start"
                                                    // type="datetime-local"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    // InputLabelProps={{
                                                    // shrink: true,
                                                    // }}
                                                    // min={date}
                                                    inputProps={{
                                                        min: date
                                                    }}
                                                    variant="outlined"
                                                    required
                                                />
                                            }
                                            <CheckboxFormsy
                                                fullWidth
                                                className="my-16"
                                                name="week"
                                                value={week}
                                                label="Semanal"
                                                onChange={handleChangeWeek}
                                            />
                                            <div
                                              className="flex-col w-full items-center pl-10 pr-10"  
                                            >
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="start"
                                                    label="Hora de inicio"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                />
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="end"
                                                    label="Hora de cierre"
                                                    value={selectedEndDate}
                                                    onChange={handleEndChange}
                                                />
                                            </div>
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </>
                                :
                                <DialogContentText id="alert-dialog-slide-description" className="mb-16 p-16">
                                    No hay calendarios.
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
export default EventsCalendarEventDialog;