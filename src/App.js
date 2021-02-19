import React from "react"
import Header from "./components/Header"
import Graph from "./components/Graph"
import Footer from "./components/Footer"
import axios from "axios"
import GraphCountry from "./components/GraphCountry"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      covidData: [],
      countryData: [],
      usState: "ca",
      country: 'US',
      yAxis: 'total'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpdate = this.handleStateUpdate.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
    this.handleCountryUpdate = this.handleCountryUpdate.bind(this)
  }

  componentDidMount() {
    Promise.all([
      axios.get(`https://api.covidtracking.com/v1/states/ca/daily.json`),
      axios.get(`https://corona-api.com/countries/US`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ]).then(([response1, response2]) => {
      this.setState({
        covidData: response1.data,
        countryData: response2.data.data.timeline
      })
      console.log('-----')
      console.log(response1.data)
      console.log(response2.data.data.timeline)
      console.log('-----')
    })
    }
    //API FOR ALL COUNTRIES
    // https://documenter.getpostman.com/view/10808728/SzS8rjbc#9739c95f-ef1d-489b-97a9-0a6dfe2f74d8

  handleChange(event){
    this.setState({usState: event.target.value}, () => this.handleStateUpdate())
  }

  handleCountryChange = (event) => {
    this.setState({country: event.target.value}, () => this.handleCountryUpdate()
    )
  }

  handleYChange(event) {
    this.setState({yAxis: event.target.value})
  }

  handleStateUpdate() {
    axios.get(`https://api.covidtracking.com/v1/states/${this.state.usState}/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data
        })
      })  
  }

  handleCountryUpdate() {
    axios.get(`https://corona-api.com/countries/${this.state.country}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => {
        this.setState({
          countryData: response.data.data.timeline
        })
        // console.log('-----')
        // console.log(response.data)
        // console.log('-----')
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
      <GraphCountry covidCountryData={this.state.countryData} />
      <form onSubmit={this.handleSubmit}>
        <label>Choose a Country:
          <select 
            value={this.state.country} 
            onChange={this.handleCountryChange}
          >
            <option value='US'>United States</option>
            <option value='RU'>Russia</option>
          </select>
        </label> 
      </form>    
      <Footer />
    </div>
    )
  }
}

export default App;

