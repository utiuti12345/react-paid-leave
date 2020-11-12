import React from "react";
import {connect} from "react-redux";

const GOOGLE_BUTTON_ID = "google-sign-in-button";

class Login extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            width: 200,
            height: 50,
            onsuccess: this.onSuccess
        });
    }

    onSuccess(googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log("Name: " + profile.getName());
    }

    render() {
        return <div id={GOOGLE_BUTTON_ID} />;
    }
}

export default connect(state => state)(Login);