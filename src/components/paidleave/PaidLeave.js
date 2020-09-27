import React from 'react';
import DatePickers from "../common/DatePickers";

import './PaidLeave.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

class PaidLeave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dates: [],
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
        return (
            <div>
                <Container maxWidth="sm">
                    <Typography component="div" style={{backgroundColor: '#cfe8fc', height: '100vh'}}>
                        {this.state.dates.map((value, index) => (
                            <div key={index}>
                                <Box display="flex"
                                     flexWrap="wrap"
                                     p={1}
                                     m={1}
                                     bgcolor="background.paper">
                                    <DatePickers/>
                                    <IconButton aria-label="delete" onClick={() => this.deleteDatePicker(index)}>
                                        <DeleteIcon fontSize="Large"/>
                                    </IconButton>
                                </Box>
                            </div>
                        ))}
                        <button className="button primary" onClick={this.addDatePicker}>+</button>
                    </Typography>
                </Container>
            </div>
        )
    }
}

export default PaidLeave;