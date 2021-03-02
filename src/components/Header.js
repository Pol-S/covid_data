import React from "react"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      Placeholder Header "Covid and You"
      <ul>
        <Link to="/components/usastates">
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