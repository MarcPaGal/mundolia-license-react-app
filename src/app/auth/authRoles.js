/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	admin_escuela: ['admin', 'admin_escuela','director_escuela', 'Escuela-I', 'Escuela-M', 'Escuela-A'],
	teacher: ['maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A'],
	aulaVirtual: ['maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'alumno', 'alumno_secundaria', 'preescolar', 'alumnoe0', 'alumnoe1', 'alumnoe2', 'alumnoe3', 'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Alumno-I', 'Alumno-M', 'Alumno-A'],
	user: ['admin', 'admin_escuela', 'user'],
	alumno:['admin', 'admin_escuela', 'alumno', 'alumno_secundaria', 'preescolar', 'maestro_preescolar', 'maestro_secundaria', 'maestro', 'padre', 'profesor_summit_2021', 'alumnoe0', 'alumnoe1', 'alumnoe2', 'alumnoe3', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Padre-I', 'Padre-M', 'Padre-A', 'Alumno-I', 'Alumno-M', 'Alumno-A'],
	dashboard:['alumno', 'alumno_secundaria', 'preescolar', 'alumnoe0', 'alumnoe1', 'alumnoe2',	'alumnoe3', 'Alumno-I', 'Alumno-M', 'Alumno-A'],
	memberships: ['Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Padre-I', 'Padre-M', 'Padre-A'],
	activities:['alumno', 'alumno_secundaria', 'preescolar', 'maestro_preescolar', 'maestro_secundaria', 'maestro', 'profesor_summit_2021', 'alumnoe0', 'alumnoe1', 'alumnoe2',	'alumnoe3',	'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I',	'Maestro-M', 'Maestro-A', 'Alumno-I', 'Alumno-M', 'Alumno-A'],
	onlyGuest: [],
	adminLicencias: ['Maestro-I',	'Maestro-M', 'Maestro-A', 'Padre-I', 'Padre-M', 'Padre-A'],
	grupos: ['admin', 'admin_escuela','director_escuela', 'maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I', 'Maestro-M', 'Maestro-A'],
	usuarios: ['admin', 'admin_escuela','director_escuela', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A'],
};

export default authRoles;
