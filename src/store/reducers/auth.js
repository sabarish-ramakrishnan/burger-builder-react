import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../common/sharedFunctions'

const initialState = {
    userToken: 'test',
    loading: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_ERROR:
            return updateObject(state, { loading: false });
        case actionTypes.SIGNUP_START:
            return updateObject(state, { loading: true });
        case actionTypes.SIGNUP_SUCCESS:
            return updateObject(state, { loading: false, userToken: action.token });
        case actionTypes.SIGNIN_START:
            return updateObject(state, { loading: true });
        case actionTypes.SIGNIN_SUCCESS:
            return updateObject(state, { loading: false, userToken: action.sessionInfo.idToken });
        default:
            return state;
    }

}

export default reducer;