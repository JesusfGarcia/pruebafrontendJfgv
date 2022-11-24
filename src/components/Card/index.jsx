import React from "react";
import ErrorMsg from "../ErrorMsg";
import Loading from "../Loading";

import "./styles.css";

export default function Card({ children, isLoading = false, error = null }) {
  if (isLoading) {
    return (
      <div className="card center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card center">
        <ErrorMsg>{error}</ErrorMsg>
      </div>
    );
  }

  return <div className="card">{children}</div>;
}
