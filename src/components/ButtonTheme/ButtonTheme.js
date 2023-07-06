import React, { useContext } from 'react'

import { ThemeContext } from "../context";

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
      Theme
    </button>
  )
}
