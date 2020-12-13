import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";

const styles = (theme) => ({
    backdrop: {
        color: "#fff"
    },
});

class CustomizedBackdrop extends React.Component{
    render() {
        const {classes} = this.props;

        console.log(this.props.progress);
        return(
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
}

export default withStyles(styles)(connect(state => state)(CustomizedBackdrop));