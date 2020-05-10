import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../common/axios/axios'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/actionIndex';
import { connect } from 'react-redux';


export class BurgerBuilder extends Component {

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        totalPrice: 4.00,
        canPurchase: false,
        purchasing: false,
        loading: false,
        prod: this.props.prod,
        error: false
    }

    componentDidMount() {
        // setTimeout(() => {
        //     axios.get('/ingredients.json').then((res) => {
        //         this.setState({ error: false, ingredients: res.data });
        //         this.updatePurchaseState();
        //         this.updatePrice();
        //     }).catch((err) => {
        //         console.log(err);
        //         this.setState({ error: true });
        //     });
        // }, 500);
        console.log(this.props);
        this.props.onInitIngredients();
        this.props.onInitPurchase();
    }
    updatePurchaseState() {
        const updatedIngredients = this.props.ings;

        const totalcount = Object.keys(updatedIngredients).map((key) => {
            return updatedIngredients[key];
        }).reduce((sum, el) => { return sum = sum + el });

        return totalcount > 0;
    }

    cancelHandler = () => {
        this.setState({ purchasing: false });
    }

    continueHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseHandler = () => {

        // const queryParams = [];
        // for (let element in this.props.ings) {
        //     queryParams.push(encodeURIComponent(element) + '=' + this.props.ings[element]);
        // }
        // queryParams.push('price=' + this.state.totalPrice);

        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('/checkout');

    }

    render() {
        let orderSummary = null;

        let burger = <Spinner />;
        if (this.props.error) {
            burger = <div><b>Unexpected error occurred.</b></div>
        }
        else if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} prod={this.state.prod} />
                    <BuildControls ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        totalprice={this.props.price.toFixed(2)}
                        canPurchase={this.updatePurchaseState()} purchasingClick={this.continueHandler} prod={this.state.prod} />
                </Aux>);
            orderSummary = <OrderSummary ingredients={this.props.ings} cancelclicked={this.cancelHandler}
                price={this.props.price.toFixed(2)} okclicked={this.purchaseHandler}></OrderSummary>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        prod: state.burgerBuilder.prod,
        error: state.burgerBuilder.error
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: ()=>dispatch(burgerBuilderActions.onInitPurchase())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios))
