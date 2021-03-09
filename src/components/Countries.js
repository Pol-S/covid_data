import React from "react"
import axios from "axios"
import GraphCountry from "./GraphCountry"
import { Dropdown } from 'semantic-ui-react'
import "../styling/Countries.css"

class Countries extends React.Component {
  constructor() {
    super()
    this.state = {
      countryData: [],
      countriesData: [],
      country: 'US',
      yAxisCountries: 'confirmed',
      countryOptions: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCountryUpdate = this.handleCountryUpdate.bind(this)
    this.handleYCountryChange = this.handleYCountryChange.bind(this)
  }

  componentDidMount() {

    Promise.all([
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
    ]).then(([response1, response2]) => {
      this.setState({
        countryData: response1.data.data.timeline,
        countriesData: response2.data.data
      })

      const options = this.state.countriesData.map((country) => {
        return {key: country.code, value: country.code, text: country.name}
      })

      this.setState({
        countryOptions: options
      })
      // console.log('=====')
      // console.log(this.state.countryOptions)
      // console.log(this.state.stateOptions)
      // console.log('====')
      // console.log('-----')
      // console.log(response1.data)
      // console.log(response2.data.data.timeline)
      // console.log(response3.data.data)
      // console.log('-----')
    })
    }

  handleCountryChange = (e, { value }) => this.setState({ country: value }, () => this.handleCountryUpdate()
  )

  handleYCountryChange(event) {
    this.setState({yAxisCountries: event.target.value})
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
        <GraphCountry 
          covidCountryData={this.state.countryData}
          yAxisCountries={this.state.yAxisCountries}
          country={this.state.country}
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
        </form>  
        <form onSubmit={this.handleSubmit}> 
          <label className="label">Choose a category:
            <select className="ui selection dropdown" value={this.state.yAxisCountries} onChange={this.handleYCountryChange}>       
                <option className="text" value='confirmed'>Total</option>
                <option className="text" value='deaths'>Death</option>
                <option className="text" value='recovered'>recovered</option>
                <option className="text" value='new_deaths'>New Deaths</option>                
                <option className="text" value='active'>active cases</option>                
            </select>
          </label> 
        </form>  
      </div>
    )
  }
}

export default Countries;

