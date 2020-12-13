import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

// function Transition(props) {
//     return <Slide {...props} direction="left" />;
// }

const CustomizedSnackbars = props => {
    const { open, handleClose, type ,message } = props;

    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
    // return (
    //     <Snackbar
    //         open={open}
    //         validationMessage={validationMessage}
    //         onClose={handleClose}
    //         TransitionComponent={Transition}
    //         transitionDuration={{
    //             enter: 1000,
    //             exit: 1000
    //         }}
    //     ></Snackbar>
    // );
};

export default CustomizedSnackbars;