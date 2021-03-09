import React from "react"
import axios from "axios"
import Graph from "./Graph"
import "../styling/USAStates.css"
import { Dropdown } from 'semantic-ui-react'

class USAStates extends React.Component {
  constructor() {
    super()
    this.state = {
      covidData: [],
      usStatesData: [],
      usState: "ca",
      yAxis: 'total',
      stateOptions: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateUpdate = this.handleStateUpdate.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
  }


  componentDidMount() {

    Promise.all([
      axios.get(`https://api.covidtracking.com/v1/states/ca/daily.json`),
      axios.get(`https://api.covidtracking.com/v1/states/current.json`)
    ]).then(([response1, response2]) => {
      this.setState({
        covidData: response1.data,
        usStatesData: response2.data
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
      // console.log(this.state.stateOptions)
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
    axios.get(`https://api.covidtracking.com/v1/states/${this.state.usState}/daily.json`)
      .then(response => {
        this.setState({
          covidData: response.data
        })
        console.log(response.data)
      })  
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  
  render() {
    return(
      <div>
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
              <option value='death'>Death</option>
              <option value='deathIncrease'>Death Increase</option>
              <option value='positiveIncrease'>Daily Cases</option>
              <option value='inIcuCurrently'>ICU currently</option>
            </select>
          </label> 
        </form>  
      </div>
    )
  }
}

export default USAStates;

