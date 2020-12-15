import React from "react";
import {connect} from "react-redux";
import {changeIsGoogleSignIn} from "../../actions/PaidLeaveActions";

const GOOGLE_BUTTON_ID = "google-sign-in-button";

class Login extends React.Component{
    componentDidMount() {
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            width: 200,
            height: 50,
            onsuccess: this.onSuccess
        });
    }

    onSuccess = () => {
        const payload = {isGoogleSignedIn:true};
        const action = changeIsGoogleSignIn(payload);
        this.props.dispatch(action);
    };

    render() {
        return <div id={GOOGLE_BUTTON_ID} />;
    }
}

export default connect(state => state)(Login);