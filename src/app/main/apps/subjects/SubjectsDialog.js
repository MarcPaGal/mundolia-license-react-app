import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { submitCreateSubject } from './store/subjectSlice';
import { showMessage } from "../../../store/fuse/messageSlice";
import {
    closeNewSubjectDialog,
    closeEditSubjectDialog,
    submitCreateSubject,
    submitUpdateSubject,
    registerReset
} from './store/subjectSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextFieldFormsy } from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";

const defaultFormState = {
    custom_name: '',
    subject_id: '',
    group_id: '',
    activities: 0,

};

function SubjectDialog(props) {
    const dispatch = useDispatch();
    const subjectDialog = useSelector(({ SubjectsApp }) => SubjectsApp.subject.subjectDialog);
    const formOrigin = useSelector(({ SubjectsApp }) => SubjectsApp.subject.subjectDialog.data);
    const subject = useSelector(({ SubjectsApp }) => SubjectsApp.subject.subject);
    const subjectList = useSelector(({ SubjectsApp }) => SubjectsApp.subject.subjectList.data);
    const groups = useSelector(({ SubjectsApp }) => SubjectsApp.subject.groups.data);
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
        // /**
        //  * Dialog type: 'edit'
        //  */
        if ((subjectDialog.type === 'edit') && subjectDialog.data) {
            setForm({ ...subjectDialog.data });
        }


        /**
         * Dialog type: 'new'
         */
        if (subjectDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...subjectDialog.data,
                id: FuseUtils.generateGUID()
            });
        }
    }, [subjectDialog.data, subjectDialog.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (subjectDialog.props.open) {
            initDialog();
        }
    }, [subjectDialog.props.open, initDialog]);

    useEffect(() => {
        if (subject.error) {

            if (subject.error.response.request.status == '500') {
                setValues({ ...values, loading: false });
                dispatch(showMessage({ message: subject.error.data.message, variant: 'error' }));
            } else {

                disableButton();
                setValues({ ...values, loading: false });

                if (subject.error.response.data.message.schoolId) {
                    dispatch(showMessage({ message: 'El usuario no tiene escuela', variant: 'error' }));
                }
                else {
                    if (subject.error.response.data.message.includes("No query results")) {
                        dispatch(showMessage({ message: 'Grupo invalido. Contacta al administrador.', variant: 'error' }));
                    }
                    else {
                        dispatch(showMessage({ message: subject.error.response.data.message, variant: 'error' }));
                    }
                }
            }
            dispatch(registerReset());
        }

        if (subject.success) {
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));

            closeComposeDialog();
        }
    }, [subject.error, subject.success]);

    function closeComposeDialog() {
        return (subjectDialog.type === 'edit') ? dispatch(closeEditSubjectDialog()) : dispatch(closeNewSubjectDialog());
        // return  dispatch(closeNewSubjectDialog());
    }

    function handleSubmit(event) {
        setValues({ ...values, loading: true });
        event.preventDefault();

        if (subjectDialog.type === 'new') {
            dispatch(submitCreateSubject(form, props.params));
        }
        else
            if (subjectDialog.type === 'edit') {
                dispatch(submitUpdateSubject(form, formOrigin, props.params));
            }
    }

    function enableButton() {
        setIsFormValid(true);
    }
    function validateForm(values) {
        setForm(values);
    }
    return (
        <Dialog
            classes={{
                paper: 'm-24 rounded-8'
            }}
            {...subjectDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {subjectDialog.type === 'new' && 'Nueva Materia'}
                        {subjectDialog.type === 'edit' && 'Editar Materia'}
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
                    <TextFieldFormsy
                        fullWidth
                        className="mb-16"
                        type="text"
                        name="custom_name"
                        label="Nombre de la materia"
                        id="custom_name"
                        value={form.custom_name || ''}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        class
									</Icon>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        required
                    />
                    <SelectFormsy
                        id="subject_id"
                        name="subject_id"
                        width="100%"
                        value={form.subject_id}
                        onChange={handleChange}
                        label="Materia Base"
                        fullWidth
                        variant="outlined"
                        className="mb-24 MuiInputBase-fullWidth"
                        required
                    >
                        {subjectList.map((row) => (
                            <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                        ))
                        }
                    </SelectFormsy>
                    {
                        form.activities ?
                            null
                        :
                            <SelectFormsy
                                id="group_id"
                                name="group_id"
                                width="100%"
                                value={form.group_id || props.params.id}
                                onChange={handleChange}
                                label="Grupo"
                                fullWidth
                                variant="outlined"
                                className="mb-24 MuiInputBase-fullWidth"
                                required
                            >
                                {groups.map((row) => (
                                    <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                                ))
                                }
                            </SelectFormsy>
                    }
                    <TextFieldFormsy
                        type="hidden"
                        name="activities"
                        id="activities"
                        value={form.activities}
                    />

                </DialogContent>

                {values.loading && <LinearProgress />}

                {subjectDialog.type === 'new' ? (
                    <DialogActions className="justify-between p-8">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={(values.loading || !isFormValid)}
                            >
                                Agregar
							</Button>
                        </div>
                    </DialogActions>
                )
                : null
                }
                {subjectDialog.type === 'edit' ? (
                    <DialogActions className="justify-between p-8">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={(values.loading || !isFormValid)}
                            >
                                Actualizar
							</Button>
                        </div>
                    </DialogActions>
                )
                    : null
                }
            </Formsy>
        </Dialog>
    );
}

export default SubjectDialog;
