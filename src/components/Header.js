import React from "react"
import { Link } from 'react-router-dom'
import "../styling/Header.css"
import covidsafety from "../data/covidsafety.png"

function Header() {
  return (
    <header>
      <div className="banner">
        <div className="title">Covid<br></br>Data<br></br> Tracker</div>
        <div className="image">
          <img src={covidsafety} style={{height: "100px", textAlign: "right"}}/>
        </div>
      
      </div>
      <div className="buttons">
        <div className="ui buttons">
          <Link to="/">
            <button className="ui button">
              United States Data
            </button>
          </Link>
          <div className="or"></div>
          <Link to="/components/countries">
            <button className="ui button">
              International Data
            </button>
          </Link>
          </div>
      </div>
    <br></br>
    </header>
  )
}
export default Header