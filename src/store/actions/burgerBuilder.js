import * as actionTypes from './actionTypes';
import axios from '../../common/axios/axios'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR
    }
}

export const initIngredients = () => {
    return dispatch => {
        setTimeout(() => {
            axios.get('/ingredients.json').then((res) => {
                dispatch(setIngredients(res.data));
            }).catch((err) => {
                dispatch(fetchIngredientsFailed());
            });
        }, 500);
    }
}