import React from "react";

import "./styles.css";

export default function PersistenceLabel({ per }) {
  return (
    <span className={`${per < 0 ? "negative" : "positive"}`}>{`${
      Math.abs(per) * 100
    }%`}</span>
  );
}
