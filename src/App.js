import React, { Component } from 'react';
import Map from "./components/map";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Map className="map" />
      </div>
    );
  }
}

export default App;
