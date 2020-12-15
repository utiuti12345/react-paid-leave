import React from 'react';
import {connect} from "react-redux";

import {changeApproveId, changeEmployeeId} from "../../actions/PaidLeaveActions";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {withStyles} from "@material-ui/core";

import AppConfig from "../../config/AppConfig";

const styles = (theme) => ({
    button: {
        display: 'block',
    },
    formControl: {
        width: 270,
    },
});

class PaidLeaveSelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            open: false,
            isLoaded: false,
            error: null,
        };
    }

    handleChange = (e) => {
        const data = this.state.data.find(item => item.name === e.target.value);

        let action;
        action = this.props.type === "employee"
            ? changeEmployeeId({employeeId: data.id,validationMessage:{employee:''}})
            : changeApproveId({approveId:data.id,validationMessage:{approve:''}})
        ;
        this.props.dispatch(action);
        this.setState({
            employeeName: e.target.value
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleOpen = () =>  {
        this.setState({
            open: true
        });
    };

    componentDidMount = () =>  {
        fetch(AppConfig.API_URL + "?sheet="+ this.props.sheet)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
                // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error:error
                    });
                }
            )
    };

    render() {
        const {classes} = this.props;
        const {error, isLoaded, data} = this.state;
        if (error) {
            return <div>Error: {error.validationMessage}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel>{this.props.labelName}</InputLabel>
                        <Select
                            open={this.open}
                            onClose={() => this.handleClose()}
                            onOpen={() => this.handleOpen()}
                            value={this.state.employeeName}
                            onChange={(e) => this.handleChange(e)}>
                            {data.map((employee) =>(
                                <MenuItem key={employee.id} value={employee.name}>{employee.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            );
        }
    }
}

export default connect(state => state)(withStyles(styles)(PaidLeaveSelectBox));