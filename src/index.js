import React from "react";
import ReactDOM from "react-dom";
import App from "./component/app";
import "./styles.css";

const isMobile = /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent.toLowerCase());
var useragent = 'desktop';
if (isMobile) {
  useragent = 'mobile';
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App useragent={useragent} name="Jane" />, mountNode);