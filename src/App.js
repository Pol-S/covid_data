import React from "react"
import Header from "./components/Header"
import Graph from "./components/Graph"
import Footer from "./components/Footer"
import axios from "axios"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      covidData: [],
      usState: "ca"
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    console.log(event.target)
    const {value} = event.target
    console.log(value)
    this.state.usState = value
    console.log(this.props.usState)
  }

  componentDidMount() {
    axios.get(`https://api.covidtracking.com/v1/states/${this.state.usState}/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data
        })
      })
  }
  
  render() {
    return(
      <div>
        <Header />
        <div className="ui divider">
          Introduction paragraph goes here or something.
        </div>
        <Graph 
          covidData={this.state.covidData}
          usState={this.state.usState}
        />   
        <label>Choose a State:</label>
          <select 
              value={this.state.usState}
              onChange={this.handleChange}
              name="state"
          >
              <option value='ca'>California</option>
              <option value='ma'>Massachusetts</option>
              <option value='il'>Illinois</option>

          </select>     
        <Footer />
      </div>
    )
  }
}

export default App;