import React, { Component } from 'react';
import {connect} from 'react-redux'

import axios from '../../../common/axios/axios'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/UI/Input/Input';
import * as SharedFunctions from '../../../common/sharedFunctions';
import * as orderActions from '../../../store/actions/actionIndex';

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your Name',
                    type: 'text'
                },
                validation: {
                    required: true,
                    minlength: 3
                },
                valid: false,
                value: '',
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your E-mail',
                    type: 'email'
                },
                validation: {
                    required: true,
                    minlength: 3
                },
                valid: false,
                value: '',
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your Street',
                    type: 'text'
                },
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 20
                },
                valid: false,
                value: '',
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your Zip Code',
                    type: 'text'
                },
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 9
                },
                valid: false,
                value: '',
                touched: false
            },
            deliverymethod: {
                elementType: 'select',
                elementConfig: {
                    name: 'deliverymethod',
                    options: [
                        { text: 'Fastest', value: 'fastest' },
                        { text: 'Cheapest', value: 'cheapest' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: true,
                value: 'fastest',
                touched: false
            }
        },
        //loading: false,
        orderSuccess: false,
        formValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        let formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }

        //this.setState({ loading: true });
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            orderDate: SharedFunctions.getCurrentDate('-')
        };
        // setTimeout(() => {
        //     axios.post('/orders.json', order).then((res) => {
        //         console.log(res);
        //         if (res)
        //             this.setState({ loading: false, orderSuccess: true });

        //     }).catch(() => {
        //         this.setState({ loading: false });
        //     });
        // }, 500);
        this.props.onCreateBurgerOrder(order);
    }
    orderCompletedHandler = () => {
        this.props.history.replace('/');
    }

    validate = (formElement) => {
        let isValid = true;
        const val = formElement.value;

        const rules = formElement.validation;
        if (!rules)
            return isValid;

        if (rules.required) {
            isValid = val !== '' && isValid;
        }
        if (rules.maxlength) {
            isValid = val.length <= rules.maxlength && isValid;
        }
        if (rules.minlength) {
            isValid = val.length >= rules.minlength && isValid;
        }

        return isValid;
    }

    onInputChange = (event, key) => {

        let updatedOrderForm = { ...this.state.orderForm };
        const updatedVal = event.target.value;

        let updatedFormElement = { ...updatedOrderForm[key] };
        updatedFormElement.value = updatedVal;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.validate(updatedFormElement);

        updatedOrderForm[key] = updatedFormElement;

        let formValid = true;
        for (const k in updatedOrderForm) {
            formValid = updatedOrderForm[k].valid && formValid;
        }
        this.setState({ formValid: formValid });

        this.setState({ orderForm: updatedOrderForm });

    }
    render() {
        let formsElementsArr = [];
        for (let key in this.state.orderForm) {
            formsElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
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
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            contactData = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Info</h4>
                {contactData}
                <Modal show={this.state.orderSuccess} clicked={this.orderCompletedHandler}>Order placed successfully</Modal>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onCreateBurgerOrder: (orderData) => {dispatch(orderActions.purchaseBurger(orderData))}
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(ContactData, axios))
