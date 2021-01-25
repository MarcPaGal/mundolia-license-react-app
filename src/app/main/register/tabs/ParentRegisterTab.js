import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import MenuItem from "@material-ui/core/MenuItem";

function ParentRegisterTab(props) {
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);
	const [isFormValid, setIsFormValid] = useState(false);
	const [count, setCount] = useState(1);
	// const [ArrStudents, setArrStudents] = useState([]);
	// const [newStudent, setnewStudent] = useState({
	// 	name:"",email:"",age:"",grade:""
	// });
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		console.log("model",model);
		dispatch(submitRegister(model));
	}

	/*
	* Nombre padre
	* correo papá
	* nombre al
	* correo al
	* edad al
	* nivel (depende edad)
	* reg otro hijo (opc)
	* nom colegio
	* pais
	* elegir estado / ciudad
	*/
	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="parentName"
					label="Nombre del padre"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="parentEmail"
					label="Email del padre"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="studentName"
					label="Nombre del alumno"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="studentEmail"
					label="Email del alumno"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<SelectFormsy
					id="age"
					name="age"
					width="100%"
					label="Edad del alumno"
					fullWidth
					variant="outlined"
					className="mb-24 MuiInputBase-fullWidth"
				>
					<MenuItem key={'3'} value={3}>3</MenuItem>
					<MenuItem key={'4'} value={4}>4</MenuItem>
					<MenuItem key={'5'} value={5}>5</MenuItem>
					<MenuItem key={'6'} value={6}>6</MenuItem>
					<MenuItem key={'7'} value={7}>7</MenuItem>
					<MenuItem key={'8'} value={8}>8</MenuItem>
					<MenuItem key={'9'} value={9}>9</MenuItem>
					<MenuItem key={'10'} value={10}>10</MenuItem>
					<MenuItem key={'11'} value={11}>11</MenuItem>
					<MenuItem key={'12'} value={12}>12</MenuItem>
					<MenuItem key={'13'} value={13}>13</MenuItem>
					<MenuItem key={'14'} value={14}>14</MenuItem>
					<MenuItem key={'15'} value={15}>15</MenuItem>
				</SelectFormsy>

				<SelectFormsy
					id="level"
					name="level"
					width="100%"
					label="Nivel del alumno"
					fullWidth
					variant="outlined"
					className="mb-24 MuiInputBase-fullWidth"
				>
					<MenuItem key={'kinder'} value={"kinder"}>Kinder</MenuItem>
					<MenuItem key={'primaria'} value={"primaria"}>Primaria</MenuItem>
					<MenuItem key={'secundaria'} value={"secundaria"}>Secundaria</MenuItem>
					
				</SelectFormsy>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="schoolName"
					label="Nombre de la escuela"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									school
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					validations="equalsField:password-confirm"
					validationErrors={{
						equalsField: 'Passwords do not match'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password-confirm"
					label="Confirm Password"
					validations="equalsField:password"
					validationErrors={{
						equalsField: 'Passwords do not match'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid}
					value="legacy"
				>
					Register
				</Button>
			</Formsy>
		</div>
	);
}

export default ParentRegisterTab;
