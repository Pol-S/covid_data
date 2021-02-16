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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    axios.get(`https://api.covidtracking.com/v1/states/ca/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data,
          isMounted: true
        })
      })
    }

  handleChange(event){
    this.setState({usState: event.target.value}, () => this.handleUpdate())
  }

  handleUpdate() {
    axios.get(`https://api.covidtracking.com/v1/states/${this.state.usState}/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data
        })
      })  
  }

  handleSubmit(event) {
    event.preventDefault();
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
        <form onSubmit={this.handleSubmit}>
          <label>Choose a State:
            <select value={this.state.usState} onChange={this.handleChange} name="state" >
              <option value='ca'>California</option>
              <option value='ma'>Massachusetts</option>
              <option value='il'>Illinois</option>
            </select>
          </label> 
          <input type="submit" value="Submit" />
        </form>    
        <Footer />
      </div>
    )
  }
}

export default App;