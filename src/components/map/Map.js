import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import Filter from "../filter";
import { parse } from 'wellknown';
import {fromJS} from 'immutable';
import geojsonMerge from '@mapbox/geojson-merge';
import MAP_STYLE from '../../style';

const dataLayer = fromJS({
    id: 'layer_cities',
    type: 'fill',
    source: 'cities',
    paint: {
        'fill-color': '#d05352',
        'fill-opacity': 0.5
    }
});

const defaultMapStyle = fromJS(MAP_STYLE);

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 600,
                height: 600,
                latitude: 39.242089,
                longitude: -105.174683,
                zoom: 6.5
            },
            mapStyle: defaultMapStyle
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(res) {
        const merged = geojsonMerge.merge(res.map(wkt => parse(wkt)));
        console.log(merged);
        const mapStyle = defaultMapStyle
            .setIn(['sources', 'cities'], fromJS({type: 'geojson', data: merged}))
            .set('layers', defaultMapStyle.get('layers').push(dataLayer));

        this.setState({ mapStyle });
    }

    render() {
        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    mapStyle={ this.state.mapStyle }
                >
                    <Filter handleSelect={ this.handleSelect } />
                </ReactMapGL>
            </div>
        );
    }
}

Map.propTypes = {
    selectedFilters: PropTypes.array,
    geoJsons: PropTypes.array
};

export default Map;
