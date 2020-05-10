import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as sharedFunctions from '../../common/sharedFunctions';
import classes from './Auth.css';
import axios from '../../common/axios/axios';
import * as actions from '../../store/actions/actionIndex'

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


export class Auth extends Component {

    state = {
        authForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your E-mail',
                    type: 'email'
                },
                validation: {
                    required: true,
                    minlength: 5
                },
                valid: false,
                value: '',
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your Password',
                    type: 'password'
                },
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 20
                },
                valid: false,
                value: '',
                touched: false
            }
        },
        orderSuccess: false,
        formValid: false,
        buttontext: 'Login'
    }

    authHandler = (event) => {
        event.preventDefault();

        const userData = {
            username: this.state.authForm.username.value,
            password: this.state.authForm.password.value
        };
        console.log(userData);
        if (this.state.buttontext === "Login") {
            this.props.onSignIn(userData.username, userData.password);
        }
        else {
            this.props.onSignUp(userData.username, userData.password);
        }
    }

    switchButtonText = (event) => {
        event.preventDefault();

        if (this.state.buttontext === "Login") {
            this.setState({ buttontext: 'SignUp' });
        }
        else {
            this.setState({ buttontext: 'Login' });
        }
    }

    onInputChange = (event, key) => {

        let updatedAuthForm = { ...this.state.authForm };
        const updatedVal = event.target.value;

        let updatedFormElement = { ...updatedAuthForm[key] };
        updatedFormElement.value = updatedVal;
        updatedFormElement.touched = true;
        updatedFormElement.valid = sharedFunctions.validate(updatedFormElement);

        updatedAuthForm[key] = updatedFormElement;

        let formValid = true;
        for (const k in updatedAuthForm) {
            formValid = updatedAuthForm[k].valid && formValid;
        }
        this.setState({ formValid: formValid, authForm: updatedAuthForm });
    }

    render() {
        let formsElementsArr = [];
        for (let key in this.state.authForm) {
            formsElementsArr.push({
                id: key,
                config: this.state.authForm[key]
            });
        }
        let contactData = (
            <form>
                {formsElementsArr.map((f) => {
                    if (!f.config.elementConfig)
                        return null;
                    return <Input key={f.id}
                        elementType={f.config.elementType}
                        elementConfig={f.config.elementConfig}
                        invalid={!f.config.valid}
                        value={f.config.value}
                        touched={f.config.touched}
                        shouldValidate={f.config.validation}
                        changed={(e) => this.onInputChange(e, f.id)} />
                })}
                <Button btnType="Success" clicked={this.authHandler} disabled={!this.state.formValid}>
                    {this.state.buttontext.toUpperCase()}
                </Button>
                <Button btnType="Info" clicked={this.switchButtonText}>TOGGLE</Button>
            </form>
        );
        if (this.props.loading) {
            contactData = <Spinner />
        }

        return (
            <div className={classes.Auth}>
                {contactData}
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        loading: state.auth.loading
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onSignUp: (email, password) => dispatch(actions.onSignup(email, password)),
        onSignIn: (email, password) => dispatch(actions.onSignIn(email, password))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Auth, axios))
