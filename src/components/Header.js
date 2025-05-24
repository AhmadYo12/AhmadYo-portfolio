import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default Header;
