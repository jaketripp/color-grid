// returns the section to split up, aka space between lightest to darkest
// i.e. [121, 133, 134]
function differenceBetweenColors(lightest, darkest) {
  return lightest.map((color, i) => {
    return color - darkest[i];
  });
}

// takes in the difference between colors array and the number of steps i.e. [100,100,100] and 5
// returns 25, 25, 25
function calculateStepSize(lightest, darkest, numberOfSteps) {
  const difference = differenceBetweenColors(lightest, darkest);
  const divisor = numberOfSteps - 1;
  return difference.map(x => x / divisor);
}

function createColorArr(lightest, darkest, numberOfSteps) {
  let colorArr = [lightest];
  const colorSectionWidth = calculateStepSize(lightest, darkest, numberOfSteps);
  // start newColor as the lightest
  let newColor = lightest;
  while (numberOfSteps > 2) {
    // calculate the new color using the previous new color - the step size
    newColor = differenceBetweenColors(newColor, colorSectionWidth);
    colorArr.push(newColor);
    numberOfSteps--;
  }
  colorArr.push(darkest);
  return colorArr;
}

// takes in rgb in array form
// i.e. [255, 255, 255]
// returns '255, 255, 255' 
function toRGBString(x) {
  return x.map(Math.round).join(", ");
}

// takes in rgb in array form
// i.e. [255, 255, 255] 
function toHexString(rgbArr) {
  return '#' + rgbArr.map(x => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
  
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : null;
}

export default {
  differenceBetweenColors,
  calculateStepSize,
  createColorArr,
  toRGBString,
  toHexString,
  hexToRgb
};
