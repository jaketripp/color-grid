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

    // addRows(verticalSteps, SELECTOR);

    // iterate vertically and make new array of rows
    const colorTable = leftColorArr.map((leftCell, i) => {
      const rightCell = rightColorArr[i];
      return Util.createColorArr(leftCell, rightCell, horizontalSteps);
    });

    // updateUI(colorTable, SELECTOR, blockWidth, blockHeight);

    // function addRows(verticalSteps, selector) {
    //   for (let i = 0; i < verticalSteps; i++) {
    //     const div = document.createElement("div");
    //     div.classList.add(`row-${i}`);
    //     document.querySelector(selector).appendChild(div)
    //   }
    // }

    // function updateUI(colorTable, selector, blockWidth, blockHeight) {
    //   colorTable.forEach((row, i) => {
    //     row.forEach(color => {
    //       const div = document.createElement("div");
    //       const colorStr = toRGBString(color);
    //       div.classList.add('block');
    //       div.innerText = colorStr;
    //       div.style.background = colorStr
    //       div.style.height = blockHeight;
    //       div.style.width = blockWidth;
    //       document.querySelector(`.row-${i}`).appendChild(div);
    //     });
    //   });
    // }

    return (
      <div className="App">
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
