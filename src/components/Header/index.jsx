import React from "react";

import Logo from "../../assets/atlantialogo.png";

import "./styles.css";

export default function Header() {
  return (
    <header>
      <img height={60} src={Logo} alt="Atlantia Search Logo" />
    </header>
  );
}
