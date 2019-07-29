// packages
import React, { Component } from "react";

// components
import Grid from "./Grid";

import Util from "../js/color-utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topLeft: "#78e08f",
      topRight: "#f1c40f",
      bottomLeft: "#079992",
      bottomRight: "#e9a69f",
      verticalSteps: 6,
      horizontalSteps: 10
    };
  }

  handleColorChange = e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  render() {
    const {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      verticalSteps,
      horizontalSteps
    } = this.state;

    const topLeftRGB = Util.hexToRgb(topLeft);
    const bottomLeftRGB = Util.hexToRgb(bottomLeft);
    const leftColorArr = Util.createColorArr(
      topLeftRGB,
      bottomLeftRGB,
      verticalSteps
    );

    const topRightRGB = Util.hexToRgb(topRight);
    const bottomRightRGB = Util.hexToRgb(bottomRight);
    const rightColorArr = Util.createColorArr(
      topRightRGB,
      bottomRightRGB,
      verticalSteps
    );

    const verticalStepsArr = Array.from({ length: verticalSteps }, (x, i) => i);

    // iterate vertically and make new array of rows
    const colorTable = leftColorArr.map((leftCell, i) => {
      const rightCell = rightColorArr[i];
      return Util.createColorArr(leftCell, rightCell, horizontalSteps);
    });

    // updateUI(colorTable, SELECTOR, blockWidth, blockHeight);

    return (
      <div className="App">
        <div className="form">
          <div className="form-colors">
            <div className="form-input">
              <input
                type="color"
                name="topLeft"
                title="Top left color"
                value={this.state.topLeft}
                onChange={this.handleColorChange}
              />
            </div>

            <div className="form-input">
              <input
                type="color"
                name="topRight"
                title="Top right color"
                value={this.state.topRight}
                onChange={this.handleColorChange}
              />
            </div>

            <div className="form-input">
              <input
                type="color"
                name="bottomLeft"
                title="Bottom left color"
                value={this.state.bottomLeft}
                onChange={this.handleColorChange}
              />
            </div>

            <div className="form-input">
              <input
                type="color"
                name="bottomRight"
                title="Bottom right color"
                value={this.state.bottomRight}
                onChange={this.handleColorChange}
              />
            </div>
          </div>
          <div className="form-steps">
            <label htmlFor="verticalSteps">Vertical Steps: {this.state.verticalSteps}</label>
            <input
              type="range"
              name="verticalSteps"
              min="2"
              max="20"
              step="1"
              value={this.state.verticalSteps}
              onChange={this.handleColorChange}
            />
            <label htmlFor="horizontalSteps">Horizontal Steps: {this.state.horizontalSteps}</label>
            <input
              type="range"
              name="horizontalSteps"
              min="2"
              max="20"
              step="1"
              value={this.state.horizontalSteps}
              onChange={this.handleColorChange}
            />
          </div>
        </div>
        <Grid
          table={colorTable}
          verticalSteps={this.state.verticalSteps}
          horizontalSteps={this.state.horizontalSteps}
        />
      </div>
    );
  }
}

export default App;
