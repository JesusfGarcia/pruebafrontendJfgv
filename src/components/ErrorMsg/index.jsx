import React from "react";

import "./styles.css";

export default function ErrorMsg({ children }) {
  return <span className="errorMsg">{children}</span>;
}
