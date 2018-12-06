import {ADD_WKT, SELECT_FILTERS} from "../constants/actionTypes";

const initialState = {
    selectedFilters: [],
    wkt: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_FILTERS:
            return {
                ...state,
                selectedFilters: action.payload
            };
        case ADD_WKT:
            return {
                ...state,
                wkt: [...state.wkt, ...action.payload]
            };
        default:
            return state;
    }
};
