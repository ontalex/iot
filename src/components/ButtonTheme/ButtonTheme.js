import React, { useContext } from 'react'

import { ThemeContext } from "../context";

import { ReactComponent as LightThemeBTN } from '../../assets/theme_light.svg';
import { ReactComponent as DarkThemeBTN } from '../../assets/theme_dark.svg';

import "../../styles/variables.css";
import "./ButtonTheme.css";

export default function ButtonTheme() {

  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    console.log(theme);
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button className="btn" onClick={handleToggleTheme}>
      {
        theme === "light" ? <DarkThemeBTN /> : <LightThemeBTN />
      }
    </button>
  )
}
