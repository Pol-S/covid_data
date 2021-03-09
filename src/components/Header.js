import React from "react"
import { Link } from 'react-router-dom'
import "../styling/Header.css"

function Header() {
  return (
    <header>
      <div className="banner">
      Covid Data Tracker
      </div>
      <ul>
        <Link to="/">
          <li>Compare U.S. States</li>
        </Link>
        <Link to="/components/countries">
          <li>Compare Countries</li>
        </Link>
      </ul>
      <hr></hr>
    </header>
  )
}
export default Header