import * as actionTypes from '../actions/actionTypes';
import Axios from 'axios';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
const apiKey = 'AIzaSyDtCyapzZL3yW8-QgdNbyA3BGoc0otQCNg';

const onSignInStart = () => {
    return {
        type: actionTypes.SIGNIN_START
    }
}

const onSignUpStart = () => {
    return {
        type: actionTypes.SIGNIN_START
    }
}

const onAuthError = () => {
    return {
        type: actionTypes.AUTH_ERROR
    }
}

const onSignupSuccess = (token) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token
    }
}

const onSigninSuccess = (sessionData) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        sessionInfo: sessionData
    }
}

export const onSignup = (username, password) => {
    return dispatch => {
        var userData = {
            email: username,
            password: password,
            returnSecureToken: true
        }
        dispatch(onSignUpStart());
        setTimeout(() => {
            Axios.post(baseUrl + ':signUp?key=' + apiKey, userData)
                .then((res) => {
                    console.log(res.data);
                    dispatch(onSignupSuccess(res.data.idToken));
                }).catch((e) => {
                    dispatch(onAuthError());
                });

        }, 1000);
    }
}

export const onSignIn = (username, password) => {
    return dispatch => {
        var userData = {
            email: username,
            password: password,
            returnSecureToken: true
        }
        dispatch(onSignInStart());
        setTimeout(() => {
            Axios.post(baseUrl + ':signInWithPassword?key=' + apiKey, userData)
                .then((res) => {
                    console.log(res.data);
                    dispatch(onSigninSuccess(res.data));
                }).catch((e) => {
                    console.log(e);
                    dispatch(onAuthError());
                });

        }, 1000);
    }
}

//https://firebase.google.com/docs/reference/rest/auth