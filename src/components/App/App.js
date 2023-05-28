import './App.css';
import React from "react";

import Auth from '../Auth/Auth';
import Dashboard from '../Dashboard/Dashboard';
import Menu from '../Menu/Menu';
import Profile from '../Profile/Profile';

class App extends React.Component {
  constructor(props) {
    super(props);

    let authToken = localStorage.authToken || '';

    this.state = {
      auth: Boolean(authToken),
      authToken: authToken,
      authError: null,
      openSection: "dashboard" //or "profile"
    };
    
    this.onAuthTokenChange = this.onAuthTokenChange.bind(this);
    this.onAuthTokenError = this.onAuthTokenError.bind(this);
    this.onChangeWindow = this.onChangeWindow.bind(this);
  }

  /*
    Обработчик изменения токена в Auth, скрывает форму и запрашивает дашборд с устройствами
  */
  onAuthTokenChange(token) {
    this.setState({
      authToken: token,
      authError: null,
      auth: true,
    });
  }

  /*
    Обработчик ошибки получения данных вследствии невалидной авторизации (code: 401)
  */
  onAuthTokenError(error) {
    this.setState({
      authError: error,
      auth: false
    });
  }

  onChangeWindow(window) {
    this.setState({
      openSection: window
    })

    // TODO: Пробросить функцию до меню и использовать её по нажатию кнопки
  }

  render() {
    if (this.state.auth && this.state.openSection === "dashboard") {
      return (
        <div className='window'>
          <Dashboard
            authToken={this.state.authToken}
            onAuthTokenError={this.onAuthTokenError}
          />
          <Menu onChangeWindow={this.onChangeWindow}/>
        </div>
      );
    } else if (this.state.auth && this.state.openSection === "profile") {
      return (
        <div className='window'>
          <Profile/>
          <Menu onChangeWindow={this.onChangeWindow}/>
        </div>
      )
    } else {
      return (
        <Auth 
          authToken={this.state.authToken}
          authError={this.state.authError}
          onAuthTokenChange={this.onAuthTokenChange}
        />
      );
    }
  }
}

export default App;
