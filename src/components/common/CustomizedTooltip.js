import React from "react";
import {connect} from "react-redux";

import {addPaidLeave} from "../../actions/PaidLeaveActions";

import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {withStyles} from "@material-ui/core";

const styles = (theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
});

class CustomizedTooltip extends React.Component {
    addDatePicker = () => {
        let action = addPaidLeave({});
        this.props.dispatch(action);
    };

    render() {
        const {classes} = this.props;

        return(
            <Tooltip title="Add" aria-label="add">
                <Fab color="primary" className={classes.fab}
                     onClick={(e) => this.addDatePicker(e)}>
                    <AddIcon/>
                </Fab>
            </Tooltip>
        )
    }
}

export default withStyles(styles)(connect(state => state)(CustomizedTooltip));