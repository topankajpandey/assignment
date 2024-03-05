import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const homeHandler = () => {
    navigate("/");
  };

  const onAddUserClick = () => {
    navigate("/create-user");
  };

  const ConversationHander = () => {
    navigate("/conversation");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        style={{
          display: location.pathname === "/" ? "none" : "block",
        }}
        className="btn btn-primary ml-auto"
        onClick={homeHandler}
      >
        Home
      </button>
      <button
        className="btn btn-primary ml-auto m-1"
        onClick={onAddUserClick}
      >
        Add User
      </button>
      <button
        className="btn btn-primary ml-auto m-1"
        onClick={ConversationHander}
      >
        Conversation
      </button>
    </nav>
  );
};

export default Header;
