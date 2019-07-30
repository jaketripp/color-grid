import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <p>
        Made with ❤️ by <a href="https://jaketripp.com/">Jake Tripp</a> &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
