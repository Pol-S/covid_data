import React from "react"
import axios from "axios"
import GraphCountry from "./GraphCountry"
import { Dropdown } from 'semantic-ui-react'
import "../styling/Countries.css"
import CountriesMap from "./CountriesMap"

class Countries extends React.Component {
  constructor() {
    super()
    this.state = {
      countryData: [],
      countriesData: [],
      country: 'US',
      yAxisCountries: 'Total',
      countryOptions: [],
      riskLevels: []
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
      }),
      axios.get('https://onemap.cdc.gov/onemapservices/rest/services/Hosted/COVID_Global2/FeatureServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-20037508.342787%2C%22ymin%22%3A-20037508.342781033%2C%22xmax%22%3A20037508.342781033%2C%22ymax%22%3A20037508.342787%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&outSR=102100&resultType=tile&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A78271.51696400007%2C%22extent%22%3A%7B%22xmin%22%3A-20037508.342787%2C%22ymin%22%3A-20037508.342781033%2C%22xmax%22%3A20037508.342781033%2C%22ymax%22%3A20037508.342787%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D%7D')
    ]).then(([response1, response2, response3]) => {
      this.setState({
        countryData: response1.data.data.timeline,
        countriesData: response2.data.data,
        riskLevels: response3.data.features
      })
      console.log(response3)

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
      })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  
  render() {
    return(
      <div className="ui stackable grid top aligned">
        <div class="eight wide column">
          <h2 className="yAxis">{this.state.yAxisCountries}</h2>
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
                  <option className="text" value='Total'>Total</option>
                  <option className="text" value='Deaths'>Death</option>
                  <option className="text" value='Recovered'>Recovered</option>
                  <option className="text" value='Daily Deaths'>Daily Deaths</option>                           
                  <option className="text" value='Daily Cases'>Daily Cases</option>                
              </select>
            </label> 
          </form>  
        </div>

        <div class="eight wide column">
          data block goes here
          <CountriesMap 
            riskLevels={this.state.riskLevels}
          />
        </div>
      </div>
    )
  }
}

export default Countries;

