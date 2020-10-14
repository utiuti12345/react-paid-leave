import React from 'react';
import BasicDatePicker from "../common/DatePicker";

import './PaidLeave.css';
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
import {addPaidLeave} from "../../actions/PaidLeaveActions";
import {connect} from "react-redux";

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
        };

        this.addDatePicker = this.addDatePicker.bind(this);
        this.handleChanged = this.handleChanged.bind(this);

        this.applyPaidLeave = this.applyPaidLeave.bind(this);
    }

    addDatePicker() {
        let action = addPaidLeave({});
        this.props.dispatch(action);
    }

    handleChanged(e) {
        this.setState({
            checked: e.target.checked
        })
    }

    applyPaidLeave(e) {
        let json = "";
        if (this.state.checked) {
            json = {
                type: "default",
                dates: this.state.dates
            }
        } else {
            json = {
                type: "period",
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }
        }

        console.log(json);

        fetch('https://script.google.com/macros/s/AKfycbzr4-IY8RvfQ82xtTpocmlTjl4A6U2sGNOCcigUX4PNIzJugnI/exec', {
            method: 'POST',
            body: JSON.stringify(json)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                },
                // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
                // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        //console.log(this.props.message);
        const {classes} = this.props;
        let paidLeave;


        if (this.props.mode === 'default') {
            paidLeave =
                <React.Fragment>
                    {this.props.paidLeave.map((value, index) => (
                        <BasicDatePicker key={index} index={index} labelName="有給取得日"/>
                    ))}
                    <Tooltip title="Add" aria-label="add">
                        <Fab color="primary" className={classes.fab}
                             onClick={this.addDatePicker}>
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </React.Fragment>
        } else {
            paidLeave = (
                <Grid container xs={12} justify="center">
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
            );
        }

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
                        <Grid container spacing={1} justify="center">
                            <Grid item xs={12}>
                                <ControlledOpenSelect labelName="社員名" sheet="employee_list" type="employee"/>
                            </Grid>
                            <Grid item xs={12}>
                                <ControlledOpenSelect labelName="承認者" sheet="approve_list" type="approve"/>
                            </Grid>
                            <Grid item xs={12}/>
                            <Grid item xs={12}/>
                        </Grid>
                        {paidLeave}
                        <Grid container justify="center">
                            <Tooltip title="日程を確認してね" arrow>
                                <Button onClick={this.applyPaidLeave}>申請する</Button>
                            </Tooltip>
                        </Grid>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(connect(state => state)(PaidLeave));