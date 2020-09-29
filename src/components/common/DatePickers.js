import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles, withStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(1),
    },
}));

class DatePickers extends React.Component{
    render() {
        const { classes } = this.props;
        return(
            <div>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="日付"
                        type="date"
                        defaultValue="2020-09-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(DatePickers);