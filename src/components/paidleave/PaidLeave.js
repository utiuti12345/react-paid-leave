import React from 'react';
import DatePickers from "../common/DatePickers";

import './PaidLeave.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import ControlledOpenSelect from "../common/ControlledOpenSelect";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
});

class PaidLeave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dates: ["","","",""],
        };

        this.addDatePicker = this.addDatePicker.bind(this);
        this.deleteDatePicker = this.deleteDatePicker.bind(this);
    }

    addDatePicker() {
        const _dates = [...this.state.dates];
        _dates.push("");
        this.setState(
            {dates: _dates}
        );
    }

    deleteDatePicker(index) {
        const _dates = [...this.state.dates];
        _dates.splice(index, 1);
        this.setState(
            {dates: _dates}
        );
    }

    render() {
        console.log(this.state.dates);
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper square className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            有給申請
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <ControlledOpenSelect labelName="社員名" sheet="employee_list"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ControlledOpenSelect labelName="承認者" sheet="approve_list"/>
                            </Grid>
                            <Grid item xs={12}>
                                {this.state.dates.map((value, index) => (
                                    <React.Fragment key={index}>
                                        <Box display="flex"
                                             flexWrap="wrap"
                                             p={1}
                                             m={1}
                                             bgcolor="background.paper">
                                            <Grid item xs={12} sm={6}>
                                                <DatePickers/>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <IconButton aria-label="delete" onClick={() => this.deleteDatePicker(index)}>
                                                    <DeleteIcon fontSize="Large"/>
                                                </IconButton>
                                            </Grid>
                                        </Box>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                        <button className="button primary" onClick={this.addDatePicker}>+</button>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(PaidLeave);