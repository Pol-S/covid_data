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
      yAxis: 'total'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
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

  handleYChange(event) {
    this.setState({yAxis: event.target.value})
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
          yAxis={this.state.yAxis}
        />   
        <form onSubmit={this.handleSubmit}>
          <label>Choose a State:
            <select value={this.state.usState} onChange={this.handleChange}>
              <option value='ca'>California</option>
              <option value='ma'>Massachusetts</option>
              <option value='il'>Illinois</option>
            </select>
          </label> 
        </form>    
        <form onSubmit={this.handleSubmit}>
          <label>Choose a category:
            <select value={this.state.yAxis} onChange={this.handleYChange}>
              <option value='total'>Total</option>
              <option value='hospitalized'>Hospitalized</option>
              <option value='death'>Death</option>
            </select>
          </label> 
        </form>  
        <Footer />
      </div>
    )
  }
}

export default App;