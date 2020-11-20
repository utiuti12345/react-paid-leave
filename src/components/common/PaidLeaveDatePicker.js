import React from "react";
import {connect} from "react-redux";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {changePaidLeave, deletePaidLeave} from "../../actions/PaidLeaveActions";

class PaidLeaveDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.changeDatePicker = this.changeDatePicker.bind(this);
        this.deleteDatePicker = this.deleteDatePicker.bind(this);
    }

    changeDatePicker = (e) => {
        let action = changePaidLeave(
            {
                date: e.target.value,
                index: this.props.index,
                isStartDate: this.props.isStartDate,
                isEndDate: this.props.isEndDate,
            });
        this.props.dispatch(action);
    };

    deleteDatePicker = () => {
        let action = deletePaidLeave(
            {
                index: this.props.index
            });
        this.props.dispatch(action);
    };

    render() {
        let deleteIcon;
        if (this.props.delete) {
            deleteIcon =
                <React.Fragment>
                    <Grid item xs={1} sm={2}>
                        <IconButton aria-label="delete" onClick={() => this.deleteDatePicker()}>
                            <DeleteIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={1} sm={1}/>
                </React.Fragment>
        }
        return (
            <div>
                <Grid container justify="flex-start">
                    <Grid item xs={1} sm={3}/>
                    <Grid item xs={6} sm={4}>
                        <TextField
                            id="date"
                            label={this.props.labelName}
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                            onChange={(e) => this.changeDatePicker(e)}
                        />
                    </Grid>
                    {(deleteIcon !== null) ? deleteIcon : null}
                </Grid>
            </div>
        )
    }
}

export default connect(state => state)(PaidLeaveDatePicker);