import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';



export class CheckOut extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        prod: this.props.prod
    }

    hasIngredients() {
        const updatedIngredients = this.props.ings;
        if (!updatedIngredients)
            return false;

        const totalcount = Object.keys(updatedIngredients).map((key) => {
            return updatedIngredients[key];
        }).reduce((sum, el) => { return sum = sum + el });

        return totalcount > 0;
    }

    componentDidMount() {
        if (!this.hasIngredients()) {
            this.props.history.replace('/');
        }
    }

    checkOutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkOutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {

        let summary = null;
        if (!this.props.ings || this.props.purchased) {
            summary = <Redirect to='/' />
        }
        else {
            summary = <div>
                <h2>Checkout</h2>
                <CheckOutSummary ingredients={this.props.ings} prod={this.state.prod}
                    okclicked={this.checkOutContinueHandler} cancelclicked={this.checkOutCancelHandler} />
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        }
        return summary;
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        prod: state.burgerBuilder.prod,
        purchased: state.order.purchased
    }
}
export default connect(mapStatetoProps)(CheckOut)
