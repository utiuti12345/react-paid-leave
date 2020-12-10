import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import ClearIcon from "@material-ui/core/Icon";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Transition(props) {
    return <Slide {...props} direction="left" />;
}

const CustomizedSnackbars = props => {
    const { open, handleClose, type, message } = props;

    return (
        <Snackbar
            open={open}
            message={message}
            onClose={handleClose}
            TransitionComponent={Transition}
            transitionDuration={{
                enter: 1000,
                exit: 1000
            }}
        ></Snackbar>
    );
};

export default CustomizedSnackbars;