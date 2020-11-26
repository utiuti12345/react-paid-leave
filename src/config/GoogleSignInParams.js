const GOOGLE_SIGN_IN_PARAMS = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    ux_mode: 'redirect',  // popupはブラウザーでブロックされる
};

export default GOOGLE_SIGN_IN_PARAMS;