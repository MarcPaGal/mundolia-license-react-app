import React from 'react';

const EventsCalendarAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/eventscalendar',
			component: React.lazy(() => import('./EventsCalendarApp'))
		}
	]
};

export default EventsCalendarAppConfig;