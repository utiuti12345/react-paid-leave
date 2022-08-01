import React from "react";
import {connect} from "react-redux";

import PaidLeaveSelectBox from "../common/PaidLeaveSelectBox";
import PaidLeaveDatePicker from "../common/PaidLeaveDatePicker";
import CustomizedTooltip from "../common/CustomizedTooltip";
import CustomizedSnackbars from "../common/CustomizedSnackbars";

import {changeValidationMessage} from "../../actions/PaidLeaveActions";
import {addDate, diffDate, getPreYear, getYear} from "../../common/common";

import Validation from "../../validation/Validation";
import AppConfig from "../../config/AppConfig";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch/Switch";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper/Paper";
import {withStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
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

class PaidLeaveForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: true,
            loading: false,
            progress: false,
            statusMessage: {
                open: false,
                type: '',
                requestResponseMessage: '',
            },
        }
    }

    handleChanged = (e) => {
        this.setState({
            checked: e.target.checked
        })
    };

    handleClose = (e, r) => {
        if (r === "clickaway") {
            return;
        }
        this.setState({
            ...this.state,
            statusMessage: {
                open: false,
                type: 'warning',
                requestResponseMessage: '',
            }
        });
    };

    applyPaidLeave = () => {
        this.setState({progress: true});

        let json = "";
        const employeeErrorMessage = Validation.formValidate('employeeId', this.props.employeeId);
        const approveErrorMessage = Validation.formValidate('approveId', this.props.approveId);
        const defaultErrorMessage = this.state.checked ? Validation.formValidate('paidLeave', this.props.paidLeave) : '';
        const periodErrorMessage = !this.state.checked ? Validation.formValidate('period', {
            startDate: this.props.startDate,
            endDate: this.props.endDate
        }) : '';

        if (employeeErrorMessage !== '' ||
            approveErrorMessage !== '' ||
            defaultErrorMessage !== '' ||
            periodErrorMessage !== '') {
            const payload = {
                validationMessage: {
                    employee: employeeErrorMessage,
                    approve: approveErrorMessage,
                    default: defaultErrorMessage,
                    period: periodErrorMessage,
                }
            };
            let action = changeValidationMessage(payload);
            this.props.dispatch(action);

            this.setState({progress: false});
        } else {
            if (this.state.checked) {
                json = {
                    type: "default",
                    employeeId: this.props.employeeId,
                    approveId: this.props.approveId,
                    paidLeave: this.props.paidLeave,
                    year: getYear(this.props.paidLeave[0])
                }
            } else {
                const paidLeave = [];
                const endDate = this.props.endDate;
                paidLeave.push(this.props.startDate);
                for (let i = 1; ; i++) {
                    const date = addDate(this.props.startDate, i);
                    paidLeave.push(date.toString());
                    if (diffDate(date, endDate) === 0) {
                        break;
                    }
                }

                json = {
                    type: "period",
                    employeeId: this.props.employeeId,
                    approveId: this.props.approveId,
                    paidLeave: paidLeave,
                    year: getYear(paidLeave[0])
                }
            }

            console.log(json);
            fetch(AppConfig.API_URL, {
                method: 'POST',
                body: JSON.stringify(json)
            })
                .then(res => {
                    const response = res.json();
                    console.log(response);

                    this.setState({
                        statusMessage: {
                            open: true,
                            type: 'success',
                            requestResponseMessage: '申請しました。メールを確認してください。',
                        },
                        progress: false,
                    });
                    // const payload = {
                    //     statusMessage: {
                    //         open: true,
                    //         type: 'success',
                    //         requestResponseMessage: '申請しました。メールを確認してください。',
                    //     }
                    // };
                    // let action = changeStatusMessage(payload);
                    // this.props.dispatch(action);
                })
                .catch(error => {
                        console.log(error);

                        this.setState({
                            statusMessage: {
                                open: true,
                                type: 'error',
                                requestResponseMessage: `失敗しました。(コード：${error.response})`,
                            },
                            progress: false,
                        });
                        // const payload = {
                        //     statusMessage: {
                        //         open: true,
                        //         type: 'error',
                        //         requestResponseMessage: `失敗しました。(コード：${error.response})`,
                        //     }
                        // };
                        // let action = changeStatusMessage(payload);
                        // this.props.dispatch(action);
                    }
                ).then(() => {
                // 常に実行される
                this.setState({progress: false}); // スピナーを消す
            });
        }
    };

    grantPaidLeave = () => {
        this.setState({progress: true});

        let json = "";
        const employeeErrorMessage = Validation.formValidate('employeeId', this.props.employeeId);

        if (employeeErrorMessage !== ''){
            const payload = {
                validationMessage: {
                    employee: '',
                    approve: '',
                    default: '',
                    period: '',
                    grantEmployee:employeeErrorMessage,
                }
            };
            let action = changeValidationMessage(payload);
            this.props.dispatch(action);

            this.setState({progress: false});
        }else {
            json = {
                type: "update_paid_leave_sheet",
                employeeId: this.props.employeeId,
                approveId: 1,
                year: getPreYear(new Date()),
                nextYear: getYear(new Date()),
                // test
                // year: getYear(new Date()),
                // nextYear: getNextYear(new Date())
            }

            console.log(json);
            fetch(AppConfig.API_URL, {
                method: 'POST',
                body: JSON.stringify(json)
            })
                .then(res => {
                    const response = res.json();
                    console.log(response);

                    this.setState({
                        statusMessage: {
                            open: true,
                            type: 'success',
                            requestResponseMessage: '付与しました。メールを確認してください。',
                        },
                        progress: false,
                    });
                })
                .catch(error => {
                        console.log(error);

                        this.setState({
                            statusMessage: {
                                open: true,
                                type: 'error',
                                requestResponseMessage: `失敗しました。(コード：${error.response})`,
                            },
                            progress: false,
                        });
                    }
                ).then(() => {
                // 常に実行される
                this.setState({progress: false}); // スピナーを消す
            });
        }
    }

    render() {
        const {classes} = this.props;
        let paidLeave;

        if (this.state.checked) {
            paidLeave =
                <React.Fragment>
                    {this.props.paidLeave.map((value, index) => (
                        <PaidLeaveDatePicker key={index} index={index} labelName="有給取得日" delete={true} value={value}
                                             isStartDate={false} isEndDate={false}/>
                    ))}
                    <CustomizedTooltip/>
                    {this.props.validationMessage.default && (
                        <p style={{color: 'red', fontSize: 12}}>{this.props.validationMessage.default}</p>
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
                        {this.props.validationMessage.period && (
                            <p style={{color: 'red', fontSize: 12}}>{this.props.validationMessage.period}</p>
                        )}
                    </Grid>
                </Grid>
            );
        }

        return (
            <div>
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
                        有給休暇申請
                    </Typography>
                    <Grid container spacing={1} justify="center">
                        <Grid item xs={1} sm={3}/>
                        <Grid item xs={12}>
                            <PaidLeaveSelectBox labelName="社員名" sheet="employee_list" type="employee"/>
                        </Grid>
                        <Grid item xs={12}>
                            {this.props.validationMessage.employee && (
                                <p style={{
                                    color: 'red',
                                    fontSize: 12
                                }}>{this.props.validationMessage.employee}</p>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <PaidLeaveSelectBox labelName="承認者" sheet="approve_list" type="approve"/>
                        </Grid>
                        <Grid item xs={12}>
                            {this.props.validationMessage.approve && (
                                <p style={{
                                    color: 'red',
                                    fontSize: 12
                                }}>{this.props.validationMessage.approve}</p>
                            )}
                        </Grid>
                        <Grid item xs={12}/>
                        <Grid item xs={12}/>
                    </Grid>
                    {paidLeave}
                    <Grid container justify="center">
                        {this.state.progress ? (
                            <CircularProgress style={{marginTop: 5}}/>
                        ) : (
                            <Tooltip title="日程を確認してね" arrow>
                                <Button disabled={this.state.progress}
                                        onClick={() => this.applyPaidLeave()}>申請する</Button>
                            </Tooltip>
                        )}
                    </Grid>
                    <React.Fragment>
                        <CustomizedSnackbars
                            open={this.state.statusMessage.open}
                            handleClose={(e, r) => this.handleClose()}
                            type={this.state.statusMessage.type}
                            message={this.state.statusMessage.requestResponseMessage}
                        />
                    </React.Fragment>
                </Paper>
                <Paper square className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        有給付与
                    </Typography>
                    <Grid container spacing={1} justify="center">
                        <Grid item xs={1} sm={3}/>
                        <Grid item xs={12}>
                            <PaidLeaveSelectBox labelName="社員名" sheet="employee_list" type="employee"/>
                        </Grid>
                        <Grid item xs={12}>
                            {this.props.validationMessage.grantEmployee && (
                                <p style={{
                                    color: 'red',
                                    fontSize: 12
                                }}>{this.props.validationMessage.grantEmployee}</p>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        {this.state.progress ? (
                            <CircularProgress style={{marginTop: 5}}/>
                        ) : (
                            <Tooltip title="日程を確認してね" arrow>
                                <Button disabled={this.state.progress}
                                        onClick={() => this.grantPaidLeave()}>有給付与する</Button>
                            </Tooltip>
                        )}
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(connect(state => state)(PaidLeaveForm));
