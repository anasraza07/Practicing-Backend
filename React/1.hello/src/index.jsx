import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

function Hi() {
  return (
    <div>
      Hello <strong>Anas Raza!</strong>
      <ul>
        <li>Item 01</li>
        <li>Item 02</li>
        <li className="last">Item 03</li>
      </ul>
    </div>
  )
}

ReactDOM.render(<Hi />, document.querySelector("#root"))
