import React from 'react';
import { Redirect } from 'react-router-dom';

const ItemsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/schools/:id',
			component: React.lazy(() => import('./ItemsApp'))
		},
		{
			path: '/apps/schools',
			component: () => <Redirect to="/apps/schools/all" />
		}
	]
};

export default ItemsAppConfig;
