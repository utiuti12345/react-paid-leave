import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";

const styles = (theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        width: 250,
    },
});

class ControlledOpenSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            open: false,
            isLoaded: false,
            data: [],
            error: null,
            list: this.expressions
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleChange(e) {
        this.setState({
            employeeName: e.target.value
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    componentDidMount() {
        fetch("https://script.google.com/macros/s/AKfycbzr4-IY8RvfQ82xtTpocmlTjl4A6U2sGNOCcigUX4PNIzJugnI/exec?sheet="+ this.props.sheet)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
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
    }

    render() {
        const {classes} = this.props;
        const {error, isLoaded, data} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel>{this.props.labelName}</InputLabel>
                        <Select
                            open={this.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={this.employeeName}
                            onChange={this.handleChange}
                        >
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

export default withStyles(styles)(ControlledOpenSelect);