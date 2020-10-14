import React from "react";
import {connect} from "react-redux";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {changePaidLeave, deletePaidLeave} from "../../actions/PaidLeaveActions";

class BasicDatePicker extends React.Component {
    constructor(props) {
        super(props);



        this.changeDatePicker = this.changeDatePicker.bind(this);
        this.deleteDatePicker = this.deleteDatePicker.bind(this);
    }

    changeDatePicker(e) {
        console.log(e.target.value);
        console.log(e.target.index);
        let action = changePaidLeave(
            {
                index: e.target.index,
                date: e.target.value
            });
        this.props.dispatch(action);
    }

    deleteDatePicker() {
        let action = deletePaidLeave(
            {
                index: this.props.index
            });
        this.props.dispatch(action);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={3}>
                        <TextField
                            id="date"
                            label={this.props.labelName}
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                            onChange={this.changeDatePicker}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton aria-label="delete" onClick={this.deleteDatePicker}>
                            <DeleteIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(state => state)(BasicDatePicker);