import React from "react";
import Row from "./Row";

export default function Grid(props) {
  const { table, horizontalSteps, verticalSteps } = props;
  const style = {
    gridTemplateRows: `repeat(${verticalSteps}, 1fr)`
  };
  return (
    <div id="grid" style={style}>
      {table.map((row, i) => {
        return <Row row={row} key={i} horizontalSteps={horizontalSteps}/>
      })}
    </div>
  );
}
