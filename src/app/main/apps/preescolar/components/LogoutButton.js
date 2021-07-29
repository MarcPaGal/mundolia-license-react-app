import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { logoutUser } from 'app/auth/store/userSlice';
import Button from '@material-ui/core/Button';
import '../Preescolar.css';

const useStyles = makeStyles(theme => ({
    button: {
        width: '125px',
        "&:hover": {
            transform: "scale(1.2)",
        }
    },
    logoutButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 4,
    }
}));

export default function LogoutButton() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={clsx(classes.logoutButton)} >
            <div className="float">
                <Button
                    disableRipple
                    className={clsx(classes.button)}
                    style={{
                        backgroundColor: 'transparent',
                    }}
                    type="button"
                    onClick={() => { dispatch(logoutUser()); }}
                >
                    <img src="assets/images/preescolar/logoutLia.png" alt="logo" />
                </Button>
            </div>
        </div>
    )
}
