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
              <option value='al'>Alabama</option>
              <option value='ak'>Alaska</option>
              <option value='az'>Arizona</option>
              <option value='ar'>Arkansas</option>
              <option value='ca'>California</option>
              <option value='co'>Colorado</option>
              <option value='ct'>Connecticut</option>
              <option value='de'>Delaware</option>
              <option value='fl'>Florida</option>
              <option value='ga'>Georgia</option>
              <option value='hi'>Hawaii</option>
              <option value='id'>Idaho</option>
              <option value='il'>Illinois</option>
              <option value='in'>Indiana</option>
              <option value='ia'>Iowa</option>
              <option value='ks'>Kansas</option>
              <option value='ky'>Kentucky</option>
              <option value='la'>Louisiana</option>
              <option value='me'>Maine</option>
              <option value='md'>Marlyand</option>
              <option value='ma'>Massachusetts</option>
              <option value='mi'>Michigan</option>
              <option value='mn'>Minnesota</option>
              <option value='mo'>Missouri</option>
              <option value='mt'>Montana</option>
              <option value='ne'>Nebraska</option>
              <option value='nv'>Nevada</option>
              <option value='nh'>New Hampshire</option>
              <option value='nj'>New Jersey</option>
              <option value='nm'>New Mexico</option>
              <option value='ny'>New York</option>
              <option value='nc'>North Carolina</option>
              <option value='nd'>North Dakota</option>
              <option value='oh'>Ohio</option>
              <option value='ok'>Oklahoma</option>
              <option value='or'>Oregon</option>
              <option value='pa'>Pennsylvania</option>
              <option value='ri'>Rhode Island</option>
              <option value='sc'>South Carolina</option>
              <option value='sd'>South Dakota</option>
              <option value='tn'>Tennessee</option>
              <option value='tx'>Texas</option>
              <option value='ut'>Utah</option>
              <option value='vt'>Vermont</option>
              <option value='va'>Virginia</option>
              <option value='wa'>Washington</option>
              <option value='wv'>West Virginia</option>
              <option value='wi'>Wisconsin</option>
              <option value='wy'>Wyoming</option>
            </select>
          </label> 
        </form>    
        <form onSubmit={this.handleSubmit}>
          <label>Choose a category:
            <select value={this.state.yAxis} onChange={this.handleYChange}>
              <option value='total'>Total</option>
              <option value='hospitalized'>Hospitalized</option>
              <option value='death'>Death</option>
              <option value='deathIncrease'>Death Increase</option>
            </select>
          </label> 
        </form>  
        <Footer />
      </div>
    )
  }
}

export default App;