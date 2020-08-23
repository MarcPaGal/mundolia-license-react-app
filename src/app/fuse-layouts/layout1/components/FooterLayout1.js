import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';

function FooterLayout1(props) {
	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar id="fuse-footer" className="relative z-10" color="default">
				<Toolbar className="px-16 py-0 flex items-center">
					<Typography>©2020 Club LIA | Administrador de Licecnias</Typography>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout1);
