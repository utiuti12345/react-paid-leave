import React from 'react';
import BasicDatePicker from "../common/DatePicker";

import './PaidLeave.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import ControlledOpenSelect from "../common/ControlledOpenSelect";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";

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
    fab: {
        margin: theme.spacing(2),
    },
});

class PaidLeave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: true,
            dates: [],
        };

        this.addDatePicker = this.addDatePicker.bind(this);
        this.deleteDatePicker = this.deleteDatePicker.bind(this);
        this.handleChanged = this.handleChanged.bind(this);
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

    handleChanged(e) {
        this.setState({
            checked: e.target.checked
        })
    }

    render() {
        console.log(this.state.dates);
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper square className={classes.paper}>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>期間指定</Grid>
                                <Grid item>
                                    <Switch checked={this.state.checked} onChange={this.handleChanged}
                                            name="checked"/>
                                </Grid>
                                <Grid item>個別日程</Grid>
                            </Grid>
                        </Typography>
                        <Typography component="h1" variant="h4" align="center">
                            有給申請
                        </Typography>
                        <Grid container spacing={3} justify="flex-start">
                            <Grid item xs={12} sm={6}>
                                <ControlledOpenSelect labelName="社員名" sheet="employee_list"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ControlledOpenSelect labelName="承認者" sheet="approve_list"/>
                            </Grid>
                        </Grid>
                        {this.state.checked ?
                            <Grid container spacing={6}>
                                <React.Fragment>
                                    <Grid item xs={12} sm={12}>
                                        {this.state.dates.map((value, index) =>
                                            <React.Fragment key={index}>
                                                <Box display="flex"
                                                     flexWrap="wrap"
                                                     p={1}
                                                     m={1}
                                                     bgcolor="background.paper">
                                                    <Grid item xs={4} sm={4} container justify="flex-start">
                                                        <BasicDatePicker labelName="有給取得日"/>
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} container justify="flex-start">
                                                        <IconButton aria-label="delete"
                                                                    onClick={() => this.deleteDatePicker(index)}>
                                                            <DeleteIcon fontSize="Large"/>
                                                        </IconButton>
                                                    </Grid>
                                                </Box>
                                            </React.Fragment>
                                        )}
                                    </Grid>
                                    <Tooltip title="Add" aria-label="add">
                                        <Fab color="primary" className={classes.fab}
                                             onClick={this.addDatePicker}>
                                            <AddIcon/>
                                        </Fab>
                                    </Tooltip>
                                </React.Fragment>
                            </Grid>
                            :
                            <Grid container xs={12} justify="center" >
                                <Grid item xs={4} sm={4}>
                                    <BasicDatePicker labelName="開始日"/>
                                </Grid>
                                <Grid item xs={1} sm={1} alignItems="flex-end">
                                    {/*<FormLabel>〜</FormLabel>*/}
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <BasicDatePicker labelName="終了日"/>
                                </Grid>
                            </Grid>
                        }
                        <Grid container xs={12} justify="center" >
                            <Tooltip title="日程を確認してね" arrow>
                                <Button>承認する</Button>
                            </Tooltip>
                        </Grid>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(PaidLeave);