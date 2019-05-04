import {
    INIT,
    INIT_DETAILS,
    FILTER_COCTAILS,
} from './actionsTypes';
import {makeRequest} from '@externalUtil/make-request';
import {
    getCocktails,
    getCocktailById,
} from './api';

function init(data, dataList) {
    return {
        type: INIT,
        data: data,
        dataList: dataList
    }
}

function initDetails(details, id) {
    return {
        type: INIT_DETAILS,
        id: id,
        dataDetails: details
    }
}

export function filterCocktails(textToSearch) {
    return {
        type: FILTER_COCTAILS,
        textToSearch: textToSearch
    }
}

//API ACTIONS
export function fetchCocktails() {
    return dispatch => {
        makeRequest(getCocktails, undefined, dispatch, {shouldNormalize: true})
            .then(res => {
                res.result.map(id =>
                    dispatch(fetchEachCocktailById(id))
                );
                dispatch(init(res.entities.data, res.result))
            })
    }
}

export function fetchEachCocktailById(cocktailId) {
    const paramToDetails = `i=${cocktailId}`
    return dispatch => {
        makeRequest(getCocktailById, {params: [paramToDetails]}, dispatch, {shouldNormalize: false})
            .then(res => {
                let resultTransformed = _transformData(res.drinks[0])
                dispatch(initDetails(resultTransformed, res.drinks[0].idDrink))
            })
            .catch(err => console.log('ERR >>', err))
    }
}

const _transformData = (data) => {
    let ingredients = [];
    let dataTransformed = {};
    if (data) {
        for (let i = 1; i <= 15; i++) {
            if (data[`strIngredient${i}`]) {
                ingredients = [data[`strIngredient${i}`], ...ingredients]
            } else {
                break;
            }
        }
        dataTransformed = {
            strInstructions: data.strInstructions,
            strDrinkThumb: data.strDrinkThumb,
            ingredients: ingredients
        };
    }

    return dataTransformed;
};
