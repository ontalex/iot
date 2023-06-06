import React, { Component } from 'react';

import "./Profile.css";
import "../../styles/variables.css";

import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  // получение данных о токине из локального хранилища
  componentDidMount() {
    this.setState({
      token: localStorage.getItem("authToken")
    })
  }

  // Очиститель кеш (авторизации)
  rerunAuth() {
    localStorage.clear();
  }

  render() {
    return (
      <div className='profile'>
        <div className='profile_bar'>
          <div className='profile_box'>
            <ProfileIcon className='profile_icon' />
            <button onClick={this.rerunAuth} className='profile_btn--exit'>
              <span>Выйти</span>
            </button>
          </div>
          <div className='profile_key'>
            <span>Ваш&nbsp;токен</span>
            <div className='profile_line'/>
            <span className='profile_token'>{this.state.token}</span>
          </div>
        </div>
        <div className='profile_links'>

        </div>
      </div>
    )
  }
}
