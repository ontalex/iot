import './App.css';
import React, { useState } from "react";

import Auth from '../Auth/Auth';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Profile from '../../pages/Profile/Profile';
import Activities from "../../pages/Activities/Activities";
import Menu from '../Menu/Menu';

import { ThemeContext } from '../context';
import "../../styles/variables.css";

function App() {
  const [auth, setAuth] = useState(Boolean(localStorage.authToken || ''));
  const [authToken, setAuthToken] = useState(localStorage.authToken || '');
  const [authError, setAuthError] = useState(null);
  const [openSection, setOpenSection] = useState("dashboard"); // "profile" // "dashboard" // "activities"

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
        <Menu onChangeWindow={onChangeWindow} />
        <Dashboard
          authToken={authToken}
          onAuthTokenError={onAuthTokenError}
        />
      </>
    );
  } else if (auth && openSection === "profile") {
    content = (
      <>
        <Menu onChangeWindow={onChangeWindow} />
        <Profile />
      </>
    );
  } else if (auth && openSection === "activities") {
    content = (
      <>
        <Menu onChangeWindow={onChangeWindow} />
        <Activities 
          authToken={authToken} 
          onAuthTokenError={onAuthTokenError} 
          />
      </>
    )
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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`window window--${theme}`}>{content}</div>
    </ThemeContext.Provider>
  );
}

export default App;
