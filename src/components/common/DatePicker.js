import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles, withStyles} from "@material-ui/core/styles";


const styles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent:'flex-start'
    },
    textField: {
        margin: theme.spacing(1),
        width:'250'
    },
}));

class DatePicker extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <React.Fragment>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="日付"
                        type="date"
                        className={classes.textField}
                        onChange={this.handleDatechange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </React.Fragment>
        )
    }
}

export default  withStyles(styles)(DatePicker);