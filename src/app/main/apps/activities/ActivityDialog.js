import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
// import Avatar from '@material-ui/core/Avatar';
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
import { showMessage } from "../../../store/fuse/messageSlice";
import {
	closeNewActivityDialog,
	submitCreateActivity,
	closeEditActivityDialog,
	submitUpdateActivity,
	removeActivity,
	getSubjects
} from './store/activitiesSlice.js';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextFieldFormsy } from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
// import { getSubjects } from './store/subjectSlice';

const defaultFormState = {
	id: '',
	name: '',
	group_id: '',
	finish_date: '',
	groupList: '',
	theme: '',
	instructions: '',
	is_active: true,
	file_path: '',
	url_path: '',
};

function ActivityDialog(props) {
	const dispatch = useDispatch();
	const formOrigin = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activityDialog.data);
	const activityDialog = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activityDialog);
	const groups = useSelector(({ ActivitiesApp }) => ActivitiesApp.groups.data);
	const subjects = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.subjects.data);
	const activity = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activity);

	const { form, handleChange, setForm } = useForm(defaultFormState);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [fileType, setFileType] = useState('file');
	///Getting date time
	var today = new Date();
	const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2)
		+ 'T' + ('0' + (today.getHours() + 1)).slice(-2) + ':' + ('0' + (today.getMinutes() + 1)).slice(-2);

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
		if ((activityDialog.type === 'edit') && activityDialog.data) {
			setForm({ ...activityDialog.data });
		}


		/**
		 * Dialog type: 'new'
		 */
		if (activityDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...activityDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [activityDialog.data, activityDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (activityDialog.props.open) {
			initDialog();
		}
		setFileType(formOrigin ? formOrigin.url_path ? 'url' : 'file' : 'file');
	}, [activityDialog.props.open, initDialog]);

	useEffect(() => {
		dispatch(getSubjects(form.group_id || 0));
	}, [form.group_id]);

	useEffect(() => {
		if (activity.error) {

			if (activity.error.response.request.status == '500') {
				setValues({ ...values, loading: false });
				dispatch(showMessage({ message: activity.error.response.data.message, variant: 'error' }));
			} else {
				disableButton();
				setValues({ ...values, loading: false });
				dispatch(showMessage({ message: activity.error.response.data.message, variant: 'error' }));
			}
		}

		if (activity.success) {
			setValues({ ...values, loading: false });
			dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));

			closeComposeDialog();
		}

	}, [activity.error, activity.success]);

	function closeComposeDialog() {
		return (activityDialog.type === 'edit') ? dispatch(closeEditActivityDialog()) : dispatch(closeNewActivityDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (activityDialog.type === 'new') {
			console.log("selectedFiles::",selectedFiles);
			// dispatch(submitCreateActivity(form, selectedFiles, fileType));
			setSelectedFiles(null)
		}
		else
			if (activityDialog.type === 'edit') {
				dispatch(submitUpdateActivity(form, formOrigin, selectedFiles, fileType));
				setSelectedFiles(null)
			}
	}

	function handleRemove() {
		dispatch(removeActivity(formOrigin.id));
		closeComposeDialog();
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
			{...activityDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{activityDialog.type === 'new' && 'Nueva Actividad'}
						{activityDialog.type === 'edit' && 'Editar Actividad'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					{/* <Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} /> */}
					{activityDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
					)}
				</div>
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
						name="name"
						label="Nombre de Actividad"
						id="name"
						value={form.name}
						onChange={handleChange}
						validations={{
							minLength: 2,
							maxLength: 30,
						}}
						validationErrors={{
							minLength: 'El minimo de caractere permitidos es 4',
							maxLength: 'El máximo de caracteres permitidos es 30'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										star
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>
					{
						activityDialog.type !== 'edit' ?
							groups ?

								<SelectFormsy
									id="group_id"
									name="group_id"
									width="100%"
									value={form.group_id}
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
								:
								<CircularProgress color="secondary" />
							:
							null
					}
					{
						activityDialog.type !== 'edit' ?
							subjects.length ?

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
								form.group_id ?
									<TextFieldFormsy
										fullWidth
										className="mb-16"
										type="text"
										name="subject_id"
										label="Es necesario crear materias para este grupo"
										id="subject_id"
										value={""}
										InputProps={{
											readOnly: true
										}}
										variant="outlined"
										required
									/>
									:
									null

							:
							null
					}
					
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						name="finish_date"
						label="Fecha de entrega"
						id="finish_date"
						type="datetime-local"
						value={form.finish_date.replace(" ", "T")}
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						// min={date}
						inputProps={{
							min: date
						}}
						variant="outlined"
						required
					/>
					{/* <TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="theme"
						label="Tema"
						id="theme"
						value={form.theme}
						onChange={handleChange}
						variant="outlined"
					/> */}
					<TextFieldFormsy
						fullWidth
						multiline
						rows={4}
						className="mb-16"
						type="text"
						name="instructions"
						label="Notas del profesor"
						id="instructions"
						value={form.instructions}
						onChange={handleChange}
						variant="outlined"
						validations={{
							maxLength: 100
						}}
						validationErrors={{
							maxLength: 'El máximo de carácteres permitidos es 100'
						}}
					/>
					<TextFieldFormsy
						type="hidden"
						name="is_active"
						id="is_active"
						value={form.is_active}
					/>
					<FormControl variant="outlined" >
						<FormControlLabel
							control={
								<Switch checked={form.is_active}
									name="is_active"
									id="is_active"
									onChange={(event, newValue) => {
										event.target.id = 'is_active';
										event.target.value = newValue;
										handleChange(event);
									}}
								/>}
							label="Activa"
						/>
					</FormControl>
					<RadioGroup aria-label="fileType" name="fileType" value={fileType} onChange={e => setFileType(e.target.value)} className="flex md:overflow-hidden flex-row">
						<FormControlLabel value="file" control={<Radio />} label="Subir archivo" className="mb-8" />
						<FormControlLabel value="url" control={<Radio />} label="Url del archivo" className="mb-8" />
					</RadioGroup>
					{
						fileType == 'file' ?
							<>
								<TextFieldFormsy
									fullWidth
									className="mb-16"
									type="text"
									name="file_path"
									label="Archivo"
									id="file_path"
									value={formOrigin ? formOrigin.file_path ? formOrigin.file_path.slice(formOrigin.file_path.indexOf('_') + 1) : '' : ''}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Icon className="text-20" color="action">
													attach_file
												</Icon>
											</InputAdornment>
										),
										readOnly: true,
									}}
									variant="outlined"
								/>
								<input
									fullWidth
									className="mb-16"
									type="file"
									name="file"
									id="file"
									onChange={(e) => {setSelectedFiles([...selectedFiles,e.target.files[0]])}}
									// onChange={handleChange}
									variant="outlined"
									/>
								{selectedFiles.map((row) => (
									<Typography color="inherit" className="pt-8">
										{row.name}
									</Typography>
								))}
							</>
							:
							null
					}
					{
						fileType == 'url' ?
							<TextFieldFormsy
								fullWidth
								className="mb-16"
								type="text"
								name="url_path"
								label="URL"
								id="url_path"
								value={formOrigin ? formOrigin.url_path : form.url_path}
								onChange={handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												link
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								validations={{
									maxLength: 255
								}}
								validationErrors={{
									maxLength: 'El máximo de carácteres permitidos es 255'
								}}
							/>
							:
							null
					}

					{values.loading && <LinearProgress />}

				</DialogContent>
				{activityDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={(values.loading || !isFormValid)}
							>
								Agregar
							</Button>
						</div>

					</DialogActions>


				)
					: null
				}

				{activityDialog.type === 'edit' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={(values.loading || !isFormValid)}
							>
								Guardar
							</Button>
						</div>

						<IconButton
							onClick={handleRemove}
							disabled={(values.loading)}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)
					: null
				}
			</Formsy>
		</Dialog>
	);
}

export default ActivityDialog;
