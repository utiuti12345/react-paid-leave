import React from 'react';
import {connect} from "react-redux";

import './PaidLeave.css';
import PaidLeaveForm from "./PaidLeaveForm";

import Login from "../google/Login";
import GOOGLE_SIGN_IN_PARAMS from "../../config/GoogleSignInParams";

import {withStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = (theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    text: {
        padding: theme.spacing(2, 2, 0),
    },
});

class PaidLeave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGoogleSignedIn: null,
        };
    }

    componentDidMount() {
        window.gapi.load('auth2', () => {
            //console.log(GOOGLE_SIGN_IN_PARAMS.client_id);
            // eslint-disable-next-line no-unused-expressions
            window.gapi.auth2.init(GOOGLE_SIGN_IN_PARAMS)
                .then(
                    (gAuth) => {
                        // console.log(gAuth.isSignedIn.get());
                        if (gAuth.isSignedIn.get()) {
                            this.setState(
                                {isGoogleSignedIn: true}
                            );
                        } else {
                            this.setState(
                                {isGoogleSignedIn: false}
                            );
                        }
                    })
                .catch((error) => {
                    this.setState(
                        {isGoogleSignedIn: false}
                    );
                    console.log("error" + error);
                })
        })
    }

    render() {
        //console.log(this.props.message);
        const {isGoogleSignedIn} = this.state;
        const {classes} = this.props;

        if (isGoogleSignedIn) {
            return (
                <React.Fragment>
                    <CssBaseline/>
                    <main className={classes.layout}>
                        <PaidLeaveForm/>
                    </main>
                </React.Fragment>
            )
        } else if (isGoogleSignedIn === null) {
            return (
                <div>
                    ログインしてるか確認中〜
                </div>
            )
        } else {
            return (
                <div>
                    <Login/>
                </div>
            )
        }
    }
}

export default withStyles(styles)(connect(state => state)(PaidLeave));