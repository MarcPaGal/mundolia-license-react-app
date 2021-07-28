import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from './store';
import EventsCalendarContent from './EventsCalendarContent';
import EventsCalendarTokenDialog from './EventsCalendarTokenDialog';
import EventsCalendarHeader from './EventCalendarHeader';
import { getGroups } from './store/calendarSlice';
import { getToken } from './store/tokenSlice';

function EventsCalendarApp(props) {

	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	const routeParams = useParams();

	useEffect(() => {
		dispatch(getGroups());
		dispatch(getToken());
	}, [dispatch, routeParams]);

	return (
		<>

			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<EventsCalendarHeader/>}
				content={
                    <EventsCalendarContent/>
                }
				// leftSidebarContent={<ContactsSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<EventsCalendarTokenDialog/>
		</>
	);
}

export default withReducer('EventsCalendarApp', reducer)(EventsCalendarApp);