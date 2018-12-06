import { connect } from 'react-redux';
import Map from './Map';

const mapStateToProps = state => {
  return {
      selectedFilters: state.core.selectedFilters,
      wkt: state.core.wkt
  };
};

export default connect(mapStateToProps, null)(Map);
