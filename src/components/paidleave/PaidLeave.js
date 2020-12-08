import React from 'react';
import {connect} from "react-redux";

import PaidLeaveDatePicker from "../common/PaidLeaveDatePicker";
import PaidLeaveSelectBox from "../common/PaidLeaveSelectBox";
import './PaidLeave.css';

import {addPaidLeave, changeMessage} from "../../actions/PaidLeaveActions";

import AppConfig from "../../config/AppConfig";
import {addDate, diffDate, getYear} from "../../common/common";
import Validation from "../../validation/Validation";

import GOOGLE_SIGN_IN_PARAMS from "../../config/GoogleSignInParams";

import {withStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Login from "../google/Login";

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
            isGoogleSignedIn: null,
            loading: false,
            message: {
                employee: '',
                approve: '',
                period: ''
            }
        };
    }

    addDatePicker = () => {
        let action = addPaidLeave({});
        this.props.dispatch(action);
    };

    handleChanged = (e) => {
        this.setState({
            checked: e.target.checked
        })
    };

    applyPaidLeave = () => {
        this.setState({loading: true});

        let json = "";
        const employeeErrorMessage = Validation.formValidate('employeeId', this.props.employeeId);
        const approveErrorMessage = Validation.formValidate('approveId', this.props.approveId);
        const defaultErrorMessage = this.state.checked ? Validation.formValidate('paidLeave', this.props.paidLeave) : '';
        const periodErrorMessage = !this.state.checked ? Validation.formValidate('period', {startDate:this.props.startDate,endDate:this.props.endDate}) : '';

        if (employeeErrorMessage !== '' ||
            approveErrorMessage !== '' ||
            defaultErrorMessage !== '' ||
            periodErrorMessage !== '') {
            const payload = {
                message: {
                    employee: employeeErrorMessage,
                    approve: approveErrorMessage,
                    default: defaultErrorMessage,
                    period: periodErrorMessage,
                }
            };
            let action = changeMessage(payload);
            this.props.dispatch(action);
        } else {
            if (this.state.checked) {
                json = {
                    type: "default",
                    employeeId: this.props.employeeId,
                    approveId: this.props.approveId,
                    paidLeave: this.props.paidLeave,
                    year:getYear(this.props.paidLeave[0])
                }
            } else {
                const paidLeave = [];
                const endDate = this.props.endDate;
                paidLeave.push(this.props.startDate);
                for (let i = 1; ; i++) {
                    const date = addDate(this.props.startDate,i);
                    paidLeave.push(date.toString());
                    if (diffDate(date,endDate) === 0) {
                        break;
                    }
                }

                json = {
                    type: "period",
                    employeeId: this.props.employeeId,
                    approveId: this.props.approveId,
                    paidLeave: paidLeave,
                    year:getYear(paidLeave[0])
                }
            }

            fetch(AppConfig.API_URL, {
                method: 'POST',
                body: JSON.stringify(json)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        //console.log(result);
                    },
                    // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
                    // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
                    (error) => {
                        console.log(error);
                    }
                );
        }

        this.setState({loading: false});
    };

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
        let paidLeave;

        if (this.state.checked) {
            paidLeave =
                <React.Fragment>
                    {this.props.paidLeave.map((value, index) => (
                        <PaidLeaveDatePicker key={index} index={index} labelName="有給取得日" delete={true} value={value}
                                             isStartDate={false} isEndDate={false}/>
                    ))}
                    <Tooltip title="Add" aria-label="add">
                        <Fab color="primary" className={classes.fab}
                             onClick={(e) => this.addDatePicker(e)}>
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                    {this.props.message.default && (
                        <p style={{color: 'red', fontSize: 12}}>{this.props.message.default}</p>
                    )}
                </React.Fragment>
        } else {
            paidLeave = (
                <Grid container justify="flex-start">
                    <Grid item xs={12} sm={6}>
                        <PaidLeaveDatePicker labelName="開始日" delete={false} isStartDate={true} isEndDate={false}
                                             value={this.props.startDate}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <PaidLeaveDatePicker labelName="終了日" delete={false} isStartDate={false} isEndDate={true}
                                             value={this.props.endDate}/>
                    </Grid>
                    <Grid item xs={12}>
                        {this.props.message.period && (
                            <p style={{color: 'red', fontSize: 12}}>{this.props.message.period}</p>
                        )}
                    </Grid>
                </Grid>
            );
        }
        if (isGoogleSignedIn) {
            return (
                <React.Fragment>
                    <CssBaseline/>
                    <main className={classes.layout}>
                        <Paper square className={classes.paper}>
                            <Typography component="div">
                                <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>期間指定</Grid>
                                    <Grid item>
                                        <Switch checked={this.state.checked} onChange={(e) => this.handleChanged(e)}
                                                name="checked"/>
                                    </Grid>
                                    <Grid item>個別日程</Grid>
                                </Grid>
                            </Typography>
                            <Typography component="h1" variant="h4" align="center">
                                有給申請
                            </Typography>
                            <Grid container spacing={1} justify="center">
                                <Grid item xs={1} sm={3}/>
                                <Grid item xs={12}>
                                    <PaidLeaveSelectBox labelName="社員名" sheet="employee_list" type="employee"/>
                                </Grid>
                                <Grid item xs={12}>
                                    {this.props.message.employee && (
                                        <p style={{color: 'red', fontSize: 12}}>{this.props.message.employee}</p>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <PaidLeaveSelectBox labelName="承認者" sheet="approve_list" type="approve"/>
                                </Grid>
                                <Grid item xs={12}>
                                    {this.props.message.approve && (
                                        <p style={{color: 'red', fontSize: 12}}>{this.props.message.approve}</p>
                                    )}
                                </Grid>
                                <Grid item xs={12}/>
                                <Grid item xs={12}/>
                            </Grid>
                            {paidLeave}
                            <Grid container justify="center">
                                <Tooltip title="日程を確認してね" arrow>
                                    <Button disabled={this.state.loading}
                                            onClick={() => this.applyPaidLeave()}>申請する</Button>
                                </Tooltip>
                            </Grid>
                        </Paper>
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