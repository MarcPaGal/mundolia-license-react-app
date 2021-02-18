/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	admin_escuela: ['admin', 'admin_escuela','director_escuela'],
	user: ['admin', 'admin_escuela', 'user'],
	alumno:['admin', 'admin_escuela', 'alumno', 'alumno_secundaria', 'preescolar', 'maestro_preescolar', 'maestro_secundaria', 'maestro', 'padre', 'profesor_summit_2021', 'metropolitan'],
	onlyGuest: []
};

export default authRoles;
