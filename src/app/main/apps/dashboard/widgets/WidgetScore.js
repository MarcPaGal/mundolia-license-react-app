import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function WidgetScore(props) {
	// console.log(props);
	return (
		<>
		< div className="w-full pb-28 mb-20">
			{props.widget.map((row) => (
				<Paper className="w-full rounded-8 shadow-1 mb-20">
					<div className="text-center px-24 py-32">
						<Typography className="text-24 leading-tight" color="textSecondary">
								{row.name}
						</Typography>
						<Typography className="text-44 mx-8" color="textSecondary">
							{parseFloat(row.calificacion).toFixed(2)}
						</Typography>
					</div>
					<Divider />
				</Paper>
			))
			}
			</div>
		</>
	);
}

export default React.memo(WidgetScore);
