import React from "react"
import axios from "axios"
import Graph from "./Graph"
import "../styling/USAStates.css"
import { Dropdown } from 'semantic-ui-react'
import USDataBlock from "./USDataBlock"

class USAStates extends React.Component {
  constructor() {
    super()
    this.state = {
      covidData: [],
      usStatesData: [],
      currentUsState: 'California',
      usState: "ca",
      yAxis: 'cases',
      stateOptions: [],
      deaths: 0,
      cases: 0,
      vaccinesDistributed: 0,
      vaccinesCompleted: 0,
      riskLevel: 0,
      ICUCapacityPercentage: 0,
      newCases: 0,
      newDeaths: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpdate = this.handleStateUpdate.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
  }


  componentDidMount() {

    Promise.all([
      axios.get(`https://api.covidactnow.org/v2/state/CA.timeseries.json?apiKey=7a39cf0e85284f04ae5c28ddf433ed36`),
      axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=7a39cf0e85284f04ae5c28ddf433ed36`)
    ]).then(([response1, response2]) => {
      this.setState({
        covidData: response1.data.actualsTimeseries,
        usStatesData: response2.data,
        deaths: response1.data.actuals.deaths,
        cases: response1.data.actuals.cases,
        vaccinesDistributed: response1.data.actuals.vaccinesDistributed,
        vaccinesCompleted: response1.data.actuals.vaccinationsCompleted,
        riskLevel: response1.data.riskLevels.overall,
        ICUCapacityPercentage: response1.data.metrics.icuCapacityRatio,
        newCases: response1.data.actuals.newCases,
        newDeaths: response1.data.actuals.newDeaths
      })
      console.log(response1.data)

      //API KEY:  7a39cf0e85284f04ae5c28ddf433ed36
      // https://api.covidactnow.org/v2/state/MA.timeseries.json?apiKey=7a39cf0e85284f04ae5c28ddf433ed36

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

      const optionsStates = this.state.usStatesData.map((usState) => {
      for (let i = 0; i < states.length; i++) {
        if (usState.state == states[i].code) {
          currentState = states[i].state
        }
      }
        return {key: usState.state, value: usState.state, text: currentState}
      })  

      this.setState({
        stateOptions: optionsStates
      })
      // console.log('=====')
      // console.log(this.state.countryOptions)
      // console.log('====')
      // console.log('-----')
      // console.log(response1.data)
      // console.log(response2.data.data.timeline)
      // console.log(response3.data.data)
      // console.log('-----')
    })
    }

  handleChange = (e, { value }) => this.setState({ usState: value }, () => this.handleStateUpdate()
  )

  handleYChange(event) {
    this.setState({yAxis: event.target.value})
  }

  handleStateUpdate() {
    axios.get(`https://api.covidactnow.org/v2/state/${this.state.usState}.timeseries.json?apiKey=7a39cf0e85284f04ae5c28ddf433ed36`)
      .then(response => {
        this.setState({
          covidData: response.data.actualsTimeseries,
          currentCovidData: response.data,
          deaths: response.data.actuals.deaths,
          cases: response.data.actuals.cases,
          vaccinesDistributed: response.data.actuals.vaccinesDistributed,
          vaccinesCompleted: response.data.actuals.vaccinationsCompleted,
          riskLevel: response.data.riskLevels.overall,
          ICUCapacityPercentage: response.data.metrics.icuCapacityRatio,
          newCases: response.data.actuals.newCases,
          newDeaths: response.data.actuals.newDeaths      
        })
        console.log(response.data)
      })  
      this.handleStateChange() 
  }

  handleStateChange = () => {
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

      for (let i = 0; i < states.length; i++) {
        if (this.state.usState == states[i].code) {
          currentState = states[i].state
        }
      }
    this.setState({
      currentUsState: currentState
    }) 
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  
  render() {
    return(
      <div className="ui stackable grid middle aligned">
        <div class="eight wide column">
          <Graph     
            covidData={this.state.covidData}
            usState={this.state.usState}
            yAxis={this.state.yAxis}
          />   
          <form onSubmit={this.handleSubmit}>
            Choose a state:
            <Dropdown
              options={this.state.stateOptions}
              placeholder='California'
              search
              selection
              value={this.state.usState}
              onChange={this.handleChange}
              />
          </form>  
            
          <form onSubmit={this.handleSubmit}>
                  <label className="label">Choose a category:
                    <select className="ui selection dropdown" value={this.state.yAxis} onChange={this.handleYChange}>
                      <option value='total'>Total</option>
                      <option value='hospitalized'>Hospitalized</option>
                      <option value='deaths'>Death</option>
                      <option value='newDeaths'>Daily Deaths</option>
                      <option value='newCases'>Daily Cases</option>
                      <option value='currentUsageCovid'>ICU currently</option>
                      <option value='vaccinationsCompleted'>Vaccinations Completed</option>
                      <option value='vaccinesDistributed'>Vaccinations Distributed</option>
                    </select>
                  </label> 
                </form>  
        </div>
        <div class="eight wide column">
          <USDataBlock 
            handleStateChange={this.state.currentUsState}
            usState={this.state.usState}
            deaths={this.state.deaths}
            cases={this.state.cases}
            vaccinesDistributed={this.state.vaccinesDistributed}
            vaccinesCompleted={this.state.vaccinesCompleted}
            riskLevel={this.state.riskLevel}
            ICUCapacityPercentage={this.state.ICUCapacityPercentage}
            newCases={this.state.newCases}
            newDeaths={this.state.newDeaths}
          />
        </div>
      </div>
    )
  }
}

export default USAStates;

