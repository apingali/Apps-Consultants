import React, { PureComponent } from 'react';
import { connect }from 'react-redux';
import Filter from './Filter';
import {ADD_WKT, SELECT_FILTERS} from "../../constants/actionTypes";

class FilterContainer extends PureComponent {
    render() {
        return (
            <Filter { ...this.props }/>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedFilters: state.core.selectedFilters,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        select: (filters) => dispatch({ type: SELECT_FILTERS, payload: filters }),
        addWkt: (wkt) => dispatch({ type: ADD_WKT, payload: wkt })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
