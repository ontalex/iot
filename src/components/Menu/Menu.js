import React from "react";

import "./Menu.css"
import "../../styles/variables.css";

import { ReactComponent as DevicesIcon } from "../../assets/devices.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";

export default class Menu extends React.Component {

  onChangeWindow(window) {
    this.props.onChangeWindow(window);
  }

  render() {
    return (
      <div className="menu">
        <button className="btn" onClick={() => this.onChangeWindow("profile")}>
          <ProfileIcon className="menu_icon menu_icon--profile"/>
        </button>
        <button className="btn" onClick={() => this.onChangeWindow("dashboard")}>
          <DevicesIcon className="menu_icon menu_icon--devices"/>
        </button>
      </div>
    )
  }
}