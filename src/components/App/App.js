import './App.css';
import React, { useState } from "react";

import Auth from '../Auth/Auth';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Menu from '../Menu/Menu';
import Profile from '../../pages/Profile/Profile';

import { ThemeContext } from '../context';
import "../../styles/variables.css";

function App() {
  const [auth, setAuth] = useState(Boolean(localStorage.authToken || ''));
  const [authToken, setAuthToken] = useState(localStorage.authToken || '');
  const [authError, setAuthError] = useState(null);
  const [openSection, setOpenSection] = useState("dashboard"); // "profile"

  const [theme, setTheme] = useState("light");

  const onAuthTokenChange = (token) => {
    setAuthToken(token);
    setAuthError(null);
    setAuth(true);
  };

  const onAuthTokenError = (error) => {
    setAuthError(error);
    setAuth(false);
  };

  const onChangeWindow = (window) => {
    setOpenSection(window);
    // TODO: Пробросить функцию до меню и использовать её по нажатию кнопки
  };

  let content = null;

  if (auth && openSection === "dashboard") {
    content = (
      <>
        <Dashboard
          authToken={authToken}
          onAuthTokenError={onAuthTokenError}
        />
        <Menu onChangeWindow={onChangeWindow} />
      </>
    );
  } else if (auth && openSection === "profile") {
    content = (
      <>
        <Profile />
        <Menu onChangeWindow={onChangeWindow} />
      </>
    );
  } else {
    content = (
      <Auth
        authToken={authToken}
        authError={authError}
        onAuthTokenChange={onAuthTokenChange}
      />
    );
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`window window--${theme}`}>{content}</div>
    </ThemeContext.Provider>
  );
}

export default App;
