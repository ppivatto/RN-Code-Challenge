import dotProp from 'dot-prop-immutable';
import {
    FILTER_COCTAILS,
    INIT,
    INIT_DETAILS,
} from './actionsTypes';

const initialState = {
    data: null,
    dataList: [],
    dataDetails: {},
    textToFilter: ''
};

export default (state = initialState, action) => {
    const {type} = action;

    if (type === INIT) {
        state = dotProp.set(state, 'data', action.data);
        state = dotProp.set(state, 'dataList', action.dataList);
    }

    if (type === INIT_DETAILS) {
        state = dotProp.set(state, `data.${action.id}.details`, action.dataDetails);
    }

    if (type === FILTER_COCTAILS) {
        state = dotProp.set(state, 'textToFilter', action.textToSearch);
    }

    return state;
}