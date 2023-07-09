import React from "react";

import "./Menu.css"
import "../../styles/variables.css";

import { ReactComponent as DevicesIcon } from "../../assets/devices.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as ActivitiesIcon } from "../../assets/activity.svg";

import ButtonTheme from "../ButtonTheme/ButtonTheme";


const Menu = ({ onChangeWindow }) => {

  const handlerClickToPage = (page) => {
    onChangeWindow(page);
  }

  return (
    <div className="menu">

      <button className="btn" onClick={() => handlerClickToPage("profile")}>
        <ProfileIcon className="menu_icon menu_icon--profile" />
      </button>

      <button className="btn" onClick={() => handlerClickToPage("dashboard")}>
        <DevicesIcon className="menu_icon menu_icon--devices" />
      </button>

      <button className="btn" onClick={() => handlerClickToPage("activities")}>
        <ActivitiesIcon className="menu_icon menu_icon--activities" />
      </button>

      <ButtonTheme/>

    </div>
  );
};

export default Menu;
