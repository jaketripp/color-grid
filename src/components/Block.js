import React from "react";
import Util from "../js/color-utils";

export default function Block(props) {
  const colorRGB = Util.toRGBString(props.color);
  const colorHex = Util.toHexString(props.color);
  return (
    <div className="block" style={{ background: colorHex }}>
      <div className="hover" style={{ background: colorHex }}>
        <div className="rgb">{colorRGB}</div>
        <div className="hex">{colorHex}</div>
      </div>
    </div>
  );
}
