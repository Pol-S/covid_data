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
      usState: "ca",
      isMounted: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    console.log([event.target.value, "handle change log 1"])
    this.setState({usState: event.target.value})
    console.log([this.state.usState, "handle change after set state"])
    this.handleUpdate()
  }

  componentDidMount() {
    axios.get(`https://api.covidtracking.com/v1/states/ca/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data,
          isMounted: true
        })
      console.log("Did Mount")
      })
    }

  handleUpdate() {
    console.log([this.state.usState, "handle update, incoming US State"])
    axios.get(`https://api.covidtracking.com/v1/states/${this.state.usState}/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data
        })
      console.log("handle Update")
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