import React, { Component } from 'react'
import Order from './Order/Order';
import axios from '../../common/axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/actionIndex';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'

export class Orders extends Component {

    // state = {
    //     orders: [],
    //     loading: false,
    //     prod: this.props.prod ? this.props.prod : true
    // }
    componentDidMount() {
        //this.setState({ loading: true });
        this.props.onFetchOrders();
    }

    render() {
        let ordersJsx = null;

        if (this.props.loading) {
            ordersJsx = <Spinner />;
        }
        else {
            ordersJsx = this.props.orders.map((ord) => {
                return (
                    <Aux key={ord.id}>
                        <Order ingredients={ord.ingredients} price={ord.price} orderDate={ord.orderDate} prod={this.props.prod} />
                    </Aux>
                )
            });
        }
        return (
            <div>
                <h3>Orders</h3>
                {ordersJsx}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        prod: state.burgerBuilder.prod
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.onFetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(Orders, axios));
