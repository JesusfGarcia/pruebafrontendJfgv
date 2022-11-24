import React from "react";

import "./styles.css";

export default function Card({ children, isLoading = false, error = null }) {
  if (isLoading) {
    return (
      <div className="card center">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Loading ...
      </div>
    );
  }

  return <div className="card">{children}</div>;
}
