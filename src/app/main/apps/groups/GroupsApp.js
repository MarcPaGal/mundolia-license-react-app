import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import GroupDialog from './GroupDialog';
import GroupsHeader from './GroupsHeader';
import reducer from './store';
import { openNewGroupDialog, getGroups } from './store/groupSlice';
import { getTeacherInfo } from './store/teacherSlice';
import GroupsList from './GroupsList';
import {getToken} from "../eventsCalendar/store/tokenSlice";
import EventsCalendarTokenDialog from "../eventsCalendar/EventsCalendarTokenDialog";


const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
	exportButton: {
		position: 'absolute',
		right: 80,
		bottom: 12,
		zIndex: 99
	}
});

function GroupsApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getToken());
		dispatch(getGroups(routeParams));
		dispatch(getTeacherInfo());
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
				header={<GroupsHeader pageLayout={pageLayout} />}
				content={<GroupsList />}
				// leftSidebarContent={<ContactsSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={ev => dispatch(openNewGroupDialog())}
				>
					<Icon>group_add</Icon>
				</Fab>
			</FuseAnimate>
			<GroupDialog/>
			<EventsCalendarTokenDialog/>

		</>
	);
}

export default withReducer('GroupsApp', reducer)(GroupsApp);
