import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Menú',
		translate: 'MENU',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				translate: 'Dashboard',
				type: 'item',
				'auth' : authRoles.dashboard,
				icon: 'dashboard',
				url: '/apps/dashboard/'
			},
			{
				id: 'usuarios',
				title: 'Usuarios',
				translate: 'Usuarios',
				type: 'item',
				'auth' : authRoles.usuarios,
				icon: 'account_box',
				url: '/apps/usuarios/all'
			},
			{
				id: 'adminMembership',
				title: 'Administrador de membresía',
				translate: 'Admin Membresías',
				type: 'item',
				'auth' : authRoles.adminLicencias,
				icon: 'payment',
				url: '/apps/adminlicencias/1'
			},
			{
				id: 'generar-licencias',
				title: 'Importar Usuarios',
				translate: 'Importar Usuarios',
				type: 'item',
				'auth' : authRoles.admin_escuela,
				icon: 'unarchive',
				url: '/licencias'
			},
			{
				id: 'actividades',
				title: 'Tareas',
				translate: 'Tareas',
				type: 'item',
				'auth' : authRoles.activities,
				icon: 'assignment',
				url: '/apps/actividades/all'
			},
			{
				id: 'calendario',
				title: 'Calendario',
				translate: 'Calendario',
				type: 'item',
				'auth' : authRoles.teacher,
				icon: 'event',
				url: '/apps/eventscalendar'
			},
			{
				id: 'grupos',
				title: 'Grupos',
				translate: 'Grupos',
				type: 'item',
				'auth' : authRoles.grupos,
				icon: 'groups',
				url: '/apps/grupos/all'
			},
			{
				id: 'aula-virtual',
				title: 'Aula Virtual',
				translate: 'Aula Virtual',
				type: 'item',
				'auth' : authRoles.aulaVirtual,
				icon: 'meeting_room',
				url: '/apps/aula'
			},
			{
				id: 'schools-component',
				title: 'Escuelas',
				translate: 'Escuelas',
				type: 'item',
				'auth' : authRoles.admin,
				icon: 'account_balance',
				url: '/apps/schools/all'
			},
			{
				id: 'periodos-component',
				title: 'Periodos',
				translate: 'Periodos',
				type: 'item',
				'auth' : authRoles.admin,
				icon: 'calendar_today',
				url: '/apps/periodos/all'
			},
			{
				id: 'comunidad-component',
				title: 'Comunidad',
				translate: 'Comunidad',
				type: 'item',
				'auth' : authRoles.alumno,
				icon: 'forum',
				url: '/loginp'
			},
			{
				id: 'logout',
				title: 'Cerrar sesión',
				translate: 'Logout',
				type: 'item',
				'auth' : authRoles.alumno,
				icon: 'exit_to_app',
				url: '/logout'
			},
		]
	}
];

export default navigationConfig;
