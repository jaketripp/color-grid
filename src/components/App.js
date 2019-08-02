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
      topLeft: "#78E08F",
      topRight: "#F1C40F",
      bottomLeft: "#079992",
      bottomRight: "#E9A69F",
      verticalSteps: 9,
      horizontalSteps: 16,
      whichCorner: "",
      displayColorPicker: false,
      colorPickerColor: ""
    };
  }

  // set which color you're currently editing
  handleClick = whichCorner => () => {
    const newState = {};

    // toggle display
    newState.displayColorPicker = !this.state.displayColorPicker;

    // update whichCorner you clicked
    newState.whichCorner = whichCorner;

    // update colorPickerColor to initialize with whichCorner you clicked
    newState.colorPickerColor = this.state[whichCorner];

    this.setState(newState);
  };

  // hide color picker and reset whichCorner
  handleClose = () => {
    this.setState({ displayColorPicker: false, whichCorner: "" });
  };

  // update correct color
  handleChange = color => {
    if (this.state.whichCorner) {
      const newState = {};
      newState[this.state.whichCorner] = color.hex;
      newState.colorPickerColor = color.hex;
      this.setState(newState);
    }
  };

  createColorTable = () => {
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
    return leftColorArr.map((leftCell, i) => {
      const rightCell = rightColorArr[i];
      return Util.createColorArr(leftCell, rightCell, horizontalSteps);
    });
  }

  render() {
    const colorTable = this.createColorTable();

    return (
      <div className="App">
        <div className="header">
          <div className="form">
            <div className="form-colors">
              <div className="color-buttons">
                <div
                  className="color-picker-button"
                  onClick={this.handleClick("topLeft")}
                >
                  <div style={{ background: this.state.topLeft }} />
                </div>
                <div
                  className="color-picker-button"
                  onClick={this.handleClick("topRight")}
                >
                  <div style={{ background: this.state.topRight }} />
                </div>
                <div
                  className="color-picker-button"
                  onClick={this.handleClick("bottomLeft")}
                >
                  <div style={{ background: this.state.bottomLeft }} />
                </div>
                <div
                  className="color-picker-button"
                  onClick={this.handleClick("bottomRight")}
                >
                  <div style={{ background: this.state.bottomRight }} />
                </div>
              </div>

              {this.state.displayColorPicker && (
                <div className="popover">
                  <div className="cover" onClick={this.handleClose} />
                  <ChromePicker
                    color={this.state.colorPickerColor}
                    onChangeComplete={this.handleChange}
                  />
                </div>
              )}
            </div>

            <div className="form-steps">
              <div className="input-container">
                <label>Rows:</label>
                <InputRange
                  minValue={2}
                  maxValue={16}
                  value={this.state.verticalSteps}
                  onChange={value => this.setState({ verticalSteps: value })}
                />
              </div>

              <div className="input-container">
                <label>Columns:</label>
                <InputRange
                  minValue={2}
                  maxValue={16}
                  value={this.state.horizontalSteps}
                  onChange={value => this.setState({ horizontalSteps: value })}
                />
              </div>
            </div>
          </div>

          <h1>Color Grid</h1>
        </div>
        <Grid
          table={colorTable}
          verticalSteps={this.state.verticalSteps}
          horizontalSteps={this.state.horizontalSteps}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
