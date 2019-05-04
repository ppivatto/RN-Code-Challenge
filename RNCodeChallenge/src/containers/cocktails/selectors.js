import {NAME} from './constants';
import { createSelector } from 'reselect';

export const getCocktailsList = state => state[NAME].dataList;
export const getCocktailsData = state => state[NAME].data;
export const getTextToFilter = state => state[NAME].textToFilter;

export const getCocktailsDetailTransformed = createSelector(
    getCocktailsList,
    getCocktailsData,
    getTextToFilter,
    (list, data, textToFilter) => {
        let dataListFiltered = list;

        if (textToFilter && textToFilter !== '') {
            dataListFiltered = dataListFiltered.filter(id => _filterByRegex(data[id], 'strDrink', textToFilter))
        }

        return dataListFiltered;
    }
);

function _filterByRegex(data, searchKey, filter) {
    const regex = new RegExp(filter, "i");
    return regex.test(data[searchKey]);
}
