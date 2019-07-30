// packages
import React, { Component } from "react";
import { ChromePicker } from "react-color";
import InputRange from "react-input-range";

// components
import Footer from "./Footer";
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

    // iterate vertically and make new array of rows
    const colorTable = leftColorArr.map((leftCell, i) => {
      const rightCell = rightColorArr[i];
      return Util.createColorArr(leftCell, rightCell, horizontalSteps);
    });

    // <ChromePicker
    //   color={this.state.topLeft}
    //   onChangeComplete={color => {
    //     this.setState({ topLeft: color.hex });
    //   }}
    // />
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
            <div className="input-container">
              <label>Rows:</label>
              <InputRange
                minValue={2}
                maxValue={20}
                value={this.state.verticalSteps}
                onChange={value => this.setState({ verticalSteps: value })}
              />
            </div>

            <div className="input-container">
              <label>Columns:</label>
              <InputRange
                minValue={2}
                maxValue={20}
                value={this.state.horizontalSteps}
                onChange={value =>
                  this.setState({ horizontalSteps: value })
                }
              />
            </div>
          </div>
          <Footer />
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
