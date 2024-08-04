import React from "react";
import "./Footer.css";

export function Footer() {
  return <div className="footer">©{new Date().getFullYear()}</div>;
}
