import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../common/sharedFunctions'

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {

        case actionType.CREATE_ORDER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            };
            return updateObject(state, { loading: false, purchased: true, orders: state.orders.concat(newOrder) });
        case actionType.CREATE_ORDER_FAILED:
            return updateObject(state, { loading: false });
        case actionType.CREATE_ORDER_START:
            return updateObject(state, { loading: true });
        case actionType.PURCHASE_INIT:
            return updateObject(state, { purchased: false });

        case actionType.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case actionType.FETCH_ORDERS_ERROR:
            return updateObject(state, { loading: false });
        case actionType.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { loading: false, orders: action.orders });
        default:
            return state;
    }
}

export default orderReducer;