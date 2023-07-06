import React from "react";

import "./Menu.css"
import "../../styles/variables.css";

import { ReactComponent as DevicesIcon } from "../../assets/devices.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import ButtonTheme from "../ButtonTheme/ButtonTheme";


const Menu = ({ onChangeWindow }) => {

  const handleClickProfile = () => {
    onChangeWindow("profile");
  };

  const handleClickDashboard = () => {
    onChangeWindow("dashboard");
  };

  return (
    <div className="menu">

      <button className="btn" onClick={handleClickProfile}>
        <ProfileIcon className="menu_icon menu_icon--profile" />
      </button>

      <button className="btn" onClick={handleClickDashboard}>
        <DevicesIcon className="menu_icon menu_icon--devices" />
      </button>

      <ButtonTheme/>

    </div>
  );
};

export default Menu;
