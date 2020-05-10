import * as actionTypes from './actionTypes';
import axios from '../../common/axios/axios';

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.CREATE_ORDER_START
    }
}

const purchaseBurgerSuccess = (orderData, orderId) => {
    return {
        type: actionTypes.CREATE_ORDER_SUCCESS,
        id: orderId,
        orderData: orderData
    }
}

export const purchaseBurger = (order) => {

    return dispatch => {
        dispatch(purchaseBurgerStart());
        setTimeout(() => {
            axios.post('/orders.json', order).then((res) => {
                dispatch(purchaseBurgerSuccess(order, res.data.name));
            }).catch(() => {
                dispatch(purchaseBurgerFailed());
            });
        }, 1000);
    }
}

const purchaseBurgerFailed = () => {
    return {
        type: actionTypes.CREATE_ORDER_FAILED
    }
}

export const onInitPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const onFetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const onFetchOrdersFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR
    }
}

const onFetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const onFetchOrders = () => {
    return dispatch => {
        dispatch(onFetchOrdersStart());
        setTimeout(() => {
            axios.get('/orders.json').then((res) => {
                let formattedOrders = [];
                for (let key in res.data) {
                    formattedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }
                dispatch(onFetchOrdersSuccess(formattedOrders));
            }).catch((err) => {
                console.log(err);
                dispatch(onFetchOrdersFailed());
            });
        }, 500);
    }
}