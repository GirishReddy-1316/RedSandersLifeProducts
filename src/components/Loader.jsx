import React from "react";
import "../styles/loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div id="page">
        <div id="container">
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="h3">loading</div>
        </div>
</div>
    </div>
  );
}

export default Loader;
