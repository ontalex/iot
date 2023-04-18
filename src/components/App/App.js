import './App.css';
import React from "react";

import Auth from '../Auth/Auth';
import Dashboard from '../Dashboard/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);

    let authToken = localStorage.authToken || '';

    this.state = {
      auth: Boolean(authToken),
      authToken: authToken,
      authError: null
    };
    
    this.onAuthTokenChange = this.onAuthTokenChange.bind(this);
    this.onAuthTokenError = this.onAuthTokenError.bind(this);
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

  render() {
    if (this.state.auth) {
      return (
        <Dashboard
          authToken={this.state.authToken}
          onAuthTokenError={this.onAuthTokenError}
        />
      );
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
