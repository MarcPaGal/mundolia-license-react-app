import React from 'react';
import { Redirect } from 'react-router-dom';

const SubjectsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/materias/:group/:id',
			component: React.lazy(() => import('./SubjectsApp'))
		}
	]
};

export default SubjectsAppConfig;
