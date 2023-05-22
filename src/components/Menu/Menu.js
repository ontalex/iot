import React from "react";

import "./Menu.css"
import "../../styles/variables.css";

import { ReactComponent as Devices } from "../../assets/devices.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  onChangeWindow(window) {
    this.props.onChangeWindow(window);
  }

  render() {
    return (
      <div className="menu">
        <button className="btn" onClick={() => this.onChangeWindow("profile")}>
          <Profile className="menu_icon menu_icon--profile"/>
        </button>
        <button className="btn" onClick={() => this.onChangeWindow("dashboard")}>
          <Devices className="menu_icon menu_icon--devices"/>
        </button>
      </div>
    )
  }
}