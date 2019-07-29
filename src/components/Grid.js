import React from "react";

export default function Grid(props) {
  return (
    <div id="grid">
      <div className="row">
        <div className="block">
          {props.name}
        </div>
      </div>
    </div>
  );
}
