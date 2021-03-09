import React from "react"
import { Link } from 'react-router-dom'
import "../styling/Header.css"

function Header() {
  return (
    <header>
      <div className="banner">
      Covid Data Tracker
      </div>
      <div>
        <Link to="/">
          <button className="ui left attached button">
            Compare U.S. States
          </button>
        </Link>
        <Link to="/components/countries">
          <button className="right attached ui button">
            Compare Countries
          </button>
        </Link>
        </div>
      <hr></hr>
    </header>
  )
}
export default Header