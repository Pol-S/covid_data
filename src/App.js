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
      usStatesData: [],
      countryData: [],
      countriesData: [],
      usState: "ca",
      country: 'US',
      yAxis: 'total',
      yAxisCountries: 'confirmed',
      countryOptions: [],
      stateOptions: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpdate = this.handleStateUpdate.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
    this.handleCountryUpdate = this.handleCountryUpdate.bind(this)
    this.handleYCountryChange = this.handleYCountryChange.bind(this)
  }

//   selectState = (state) => {
//     let currentState = ''
//     const states = [
//       {code: 'al', state: 'Alabama'},
//       {code: 'ak', state: 'Alaska'},
//       {code: 'az', state: 'Arizona'},
//       {code: 'ar', state: 'Arkansas'},
//       {code: 'ca', state: 'California'},
//       {code: 'co', state: 'Colorado'},
//       {code: 'ct', state: 'Connecticut'},
//       {code: 'de', state: 'Delaware'},
//       {code: 'fl', state: 'Florida'},
//       {code: 'ga', state: 'Georgia'},
//       {code: 'hi', state: 'Hawaii'},
//       {code: 'id', state: 'Idaho'},
//       {code: 'il', state: 'Illinois'},
//       {code: 'in', state: 'Indiana'},
//       {code: 'ia', state: 'Iowa'},
//       {code: 'ks', state: 'Kansas'},
//       {code: 'ky', state: 'Kentucky'},
//       {code: 'la', state: 'Louisiana'},
//       {code: 'me', state: 'Maine'},
//       {code: 'md', state: 'Maryland'},
//       {code: 'ma', state: 'Massachusetts'},
//       {code: 'mi', state: 'Michigan'},
//       {code: 'mn', state: 'Minnesota'},
//       {code: 'mo', state: 'Missouri'},
//       {code: 'mt', state: 'Montana'},
//       {code: 'ne', state: 'Nebraska'},
//       {code: 'nv', state: 'Nevada'},
//       {code: 'nh', state: 'New Hampshire'},
//       {code: 'nj', state: 'New Jersey'},
//       {code: 'nm', state: 'New Mexico'},
//       {code: 'ny', state: 'New York'},
//       {code: 'nc', state: 'North Carolina'},
//       {code: 'nd', state: 'North Dakota'},
//       {code: 'oh', state: 'Ohio'},
//       {code: 'ok', state: 'Oklahoma'},
//       {code: 'or', state: 'Oregon'},
//       {code: 'pa', state: 'Pennsylvania'},
//       {code: 'ri', state: 'Rhode Island'},
//       {code: 'sc', state: 'South Carolina'},
//       {code: 'sd', state: 'South Dakota'},
//       {code: 'tn', state: 'Tennessee'},
//       {code: 'tx', state: 'Texas'},
//       {code: 'ut', state: 'Utah'},
//       {code: 'vt', state: 'Vermont'},
//       {code: 'va', state: 'Virginia'},
//       {code: 'wa', state: 'Washington'},
//       {code: 'wv', state: 'West Virginia'},
//       {code: 'wi', state: 'Wisconsin'},
//       {code: 'wy', state: 'Wyoming'}
//     ]
//   for (let i = 0; i < states.length; i++) {
//     if (state == states[i].code) {
//       currentState = states[i].state
//     }
//   }
//   return currentState
// }


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
      }),
      axios.get(`https://api.covidtracking.com/v1/states/current.json`)
    ]).then(([response1, response2, response3, response4]) => {
      this.setState({
        covidData: response1.data,
        countryData: response2.data.data.timeline,
        countriesData: response3.data.data,
        usStatesData: response4.data
      })

      let currentState = ''
      const states = [
        {code: 'AL', state: 'Alabama'},
        {code: 'AK', state: 'Alaska'},
        {code: 'AZ', state: 'Arizona'},
        {code: 'AR', state: 'Arkansas'},
        {code: 'AS', state: 'American Samoa'},
        {code: 'CA', state: 'California'},
        {code: 'CO', state: 'Colorado'},
        {code: 'CT', state: 'Connecticut'},
        {code: 'DE', state: 'Delaware'},
        {code: 'DC', state: 'Distric of Columbia'},
        {code: 'FL', state: 'Florida'},
        {code: 'GA', state: 'Georgia'},
        {code: 'GU', state: 'Guam'},
        {code: 'HI', state: 'Hawaii'},
        {code: 'ID', state: 'Idaho'},
        {code: 'IL', state: 'Illinois'},
        {code: 'IN', state: 'Indiana'},
        {code: 'IA', state: 'Iowa'},
        {code: 'KS', state: 'Kansas'},
        {code: 'KY', state: 'Kentucky'},
        {code: 'LA', state: 'Louisiana'},
        {code: 'ME', state: 'Maine'},
        {code: 'MD', state: 'Maryland'},
        {code: 'MA', state: 'Massachusetts'},
        {code: 'MI', state: 'Michigan'},
        {code: 'MP', state: 'Nothern Mariana Islands'},
        {code: 'MN', state: 'Minnesota'},
        {code: 'MO', state: 'Missouri'},
        {code: 'MS', state: 'Mississippi'},
        {code: 'MT', state: 'Montana'},
        {code: 'NE', state: 'Nebraska'},
        {code: 'NV', state: 'Nevada'},
        {code: 'NH', state: 'New Hampshire'},
        {code: 'NJ', state: 'New Jersey'},
        {code: 'NM', state: 'New Mexico'},
        {code: 'NY', state: 'New York'},
        {code: 'NC', state: 'North Carolina'},
        {code: 'ND', state: 'North Dakota'},
        {code: 'OH', state: 'Ohio'},
        {code: 'OK', state: 'Oklahoma'},
        {code: 'OR', state: 'Oregon'},
        {code: 'PA', state: 'Pennsylvania'},
        {code: 'PR', state: 'Puerto Rico'},
        {code: 'RI', state: 'Rhode Island'},
        {code: 'SC', state: 'South Carolina'},
        {code: 'SD', state: 'South Dakota'},
        {code: 'TN', state: 'Tennessee'},
        {code: 'TX', state: 'Texas'},
        {code: 'UT', state: 'Utah'},
        {code: 'VT', state: 'Vermont'},
        {code: 'VA', state: 'Virginia'},
        {code: 'WA', state: 'Washington'},
        {code: 'WV', state: 'West Virginia'},
        {code: 'WI', state: 'Wisconsin'},
        {code: 'WY', state: 'Wyoming'},
        {code: 'VI', state: 'Virgin Islands'}
      ]

      const options = this.state.countriesData.map((country) => {
        return {key: country.code, value: country.code, text: country.name}
      })
      const optionsStates = this.state.usStatesData.map((usState) => {
      for (let i = 0; i < states.length; i++) {
        if (usState.state == states[i].code) {
          currentState = states[i].state
        }
      }
        return {key: usState.state, value: usState.state, text: currentState}
      })  

      this.setState({
        countryOptions: options,
        stateOptions: optionsStates
      })
      console.log('=====')
      console.log(this.state.countryOptions)
      console.log(this.state.stateOptions)
      console.log('====')
      console.log('-----')
      console.log(response1.data)
      console.log(response2.data.data.timeline)
      console.log(response3.data.data)
      console.log('-----')
    })
    }
    //API FOR ALL COUNTRIES
    // https://documenter.getpostman.com/view/10808728/SzS8rjbc#9739c95f-ef1d-489b-97a9-0a6dfe2f74d8

  handleChange = (e, { value }) => this.setState({ usState: value }, () => this.handleStateUpdate()
  )

  handleCountryChange = (e, { value }) => this.setState({ country: value }, () => this.handleCountryUpdate()
  )

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
          Choose a state:
          <Dropdown
            options={this.state.stateOptions}
            placeholder='choose a state'
            search
            selection
            value={this.state.usState}
            onChange={this.handleChange}
            />
          {/* <label>Choose a State:
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
          </label>  */}
        </form>    
        <form onSubmit={this.handleSubmit}>
          <label className="label">Choose a category:
            <select className="ui selection dropdown" value={this.state.yAxis} onChange={this.handleYChange}>
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
          Choose a country: 
          <Dropdown
            options={this.state.countryOptions}
            placeholder='USA'
            search
            selection
            value={this.state.country}
            onChange={this.handleCountryChange}
          />
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
          <label className="label">Choose a category:
            <select className="ui selection dropdown" value={this.state.yAxisCountries} onChange={this.handleYCountryChange}>       
                <option className="text" value='confirmed'>Total</option>
                <option className="text" value='deaths'>Death</option>
                <option className="text" value='recovered'>recovered</option>
                <option className="text" value='new_deaths'>New Deaths</option>                
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

