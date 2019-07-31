import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <p>
        <a href="https://jaketripp.com/">
          Jake Tripp &copy; {new Date().getFullYear()}
        </a>
      </p>
    </div>
  );
}
