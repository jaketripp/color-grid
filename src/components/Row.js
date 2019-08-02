import React from "react";
import Block from "./Block";

export default function Row(props) {
  const { row, horizontalSteps } = props;
  const style = {
    gridTemplateColumns: `repeat(${horizontalSteps}, 1fr)`,    
  };
  return (
    <div className="row" style={style}>
      {row.map((color, i) => {
        return <Block color={color} key={i}/>;
      })}
    </div>
  );
}
