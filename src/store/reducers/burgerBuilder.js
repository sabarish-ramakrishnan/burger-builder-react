import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../common/sharedFunctions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 0.9,
    bacon: 0.8
}
const BASE_PRICE = 4;
const initialState = {
    // ingredients: {
    //     salad: 0,
    //     cheese: 0,
    //     bacon: 0,
    //     meat: 0
    // },
    ingredients: null,
    totalPrice: BASE_PRICE,
    prod: true,
    error: false
}

const reducer = (state = initialState, action) => {
    const ingredientName = action.ingredientName;

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, ingredientName);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, ingredientName);
        case actionTypes.FETCH_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: calculatePrice(action.ingredients)
            });
        case actionTypes.FETCH_INGREDIENTS_ERROR:
            return updateObject(state, { error: true });
        default:
            return state;
    }
}

const calculatePrice = (updatedIngredients) => {
    const burgerprice = Object.keys(updatedIngredients).map((key) => {
        return updatedIngredients[key] * INGREDIENT_PRICES[key];
    }).reduce((sum, el) => { return sum = sum + el });
    return burgerprice + BASE_PRICE;
}

const addIngredient = (state, ingredientName) => {
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, { [ingredientName]: state.ingredients[ingredientName] + 1 }),
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
    })
}
const removeIngredient = (state, ingredientName) => {
    const currentCount = state.ingredients[ingredientName];
    if (currentCount === 0)
        return { ...state };
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, { [ingredientName]: currentCount - 1 }),
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName]
    });
}
export default reducer;