import React from "react"
import axios from "axios"
import Header from "./components/Header"
import Graph from "./components/Graph"
import Footer from "./components/Footer"
import GraphCountry from "./components/GraphCountry"
import { Dropdown } from 'semantic-ui-react'
import DummyGraph from "./components/DummyGraph"
import DummyGraphCountry from "./components/DummyGraphCountry"
import Home from "./components/Home"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      covidData: [],
      countryData: [],
      countriesData: [],
      usState: "ca",
      country: 'US',
      yAxis: 'total',
      yAxisCountries: 'confirmed'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpdate = this.handleStateUpdate.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
    this.handleCountryUpdate = this.handleCountryUpdate.bind(this)
    this.handleYCountryChange = this.handleYCountryChange.bind(this)
  }

  componentDidMount() {
    Promise.all([
      axios.get(`https://api.covidtracking.com/v1/states/ca/daily.json`),
      axios.get(`https://corona-api.com/countries/US`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      axios.get(`https://corona-api.com/countries`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ]).then(([response1, response2, response3]) => {
      this.setState({
        covidData: response1.data,
        countryData: response2.data.data.timeline,
        countriesData: response3.data.data
      })
      console.log('-----')
      console.log(response1.data)
      console.log(response2.data.data.timeline)
      console.log(response3.data.data)
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

  handleYCountryChange(event) {
    this.setState({yAxisCountries: event.target.value})
  }

  handleStateUpdate() {
    axios.get(`https://api.covidtracking.com/v1/states/${this.state.usState}/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data
        })
        console.log(response.data)
      })  
  }

  renderCountries = () => {
    const render = this.state.countriesData.map((country) => {
      return  <option value={country.code}>{country.name}</option>
    })
    return render
  }


  handleCountryUpdate() {
    axios.get(`https://corona-api.com/countries/${this.state.country}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => {
        this.setState({
          countryData: response.data.data.timeline
        })
        console.log('-----')
        console.log(response.data)
        console.log('-----')
      })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  dropDownCountries = () => {
    const options = this.state.countriesData.map((country) => {
      return {key: country.code, value: country.code, text: country.name}
    })
    console.log(this.handleCountryChange)
    return (
      <div>
        Choose a country: 
        <Dropdown
          placeholder='USA'
          onChange={this.handleCountryChange}
          value={options.value} 
          search
          selection
          options={options}
        />
      </div>
    )
    
  }

  render() {
    return(
      <div>
      <Router>
      <Header />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/components/dummygraph" component={DummyGraph} />
          <Route path="/components/dummygraphcountry" component={DummyGraphCountry} />          
        </Switch>

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
        <GraphCountry 
          covidCountryData={this.state.countryData}
          yAxisCountries={this.state.yAxisCountries}
        />
         <form onSubmit={this.handleSubmit}>
          {this.dropDownCountries()}
          {/* <label>Choose a Country:
            <select 
              value={this.state.country} 
              onChange={this.handleCountryChange}
            >
              {this.renderCountries()}
            </select>
          </label>  */}
        </form>  
  
        <form onSubmit={this.handleSubmit}> 
          <label>Choose a category:
            <select value={this.state.yAxisCountries} onChange={this.handleYCountryChange}>
              <option value='confirmed'>Total</option>
              <option value='deaths'>Death</option>
              <option value='recovered'>recovered</option>
              <option value='new_deaths'>New Deaths</option>
            </select>
          </label> 
        </form>  
        <Footer />
      </Router>
    </div>
    )
  }
}

export default App;

