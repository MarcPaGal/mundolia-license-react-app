import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from "../auth/authRoles";

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
				id: 'Project-dashboard',
				title: 'Dashboard',
				translate: 'Dashboard',
				'auth' : authRoles.user,
				type: 'item',
				icon: 'dashboard',
				url: '/apps/dashboards/project'
			},
			{
				id: 'estudiantes',
				title: 'Estudiantes',
				translate: 'Estudiantes',
				type: 'item',
				'auth' : authRoles.user,
				icon: 'account_box',
				url: '/apps/estudiantes/all'
			},
			{
				id: 'profesores',
				title: 'Profesores',
				translate: 'profesores',
				type: 'item',
				'auth' : authRoles.user,
				icon: 'account_box',
				url: '/apps/profesores/all'
			},
			{
				id: 'schools-component',
				title: 'Escuelas',
				translate: 'Escuelas',
				type: 'item',
				'auth' : authRoles.user,
				icon: 'account_balance',
				url: '/apps/schools/all'
			},
			{
				id: 'generar-licencias',
				title: 'Asignar Licencias',
				translate: 'Asignar Licencias',
				type: 'item',
				'auth' : authRoles.user,
				icon: 'unarchive',
				url: '/licencias/'
			},
		]
	}
];

export default navigationConfig;
