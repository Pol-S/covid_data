import React from "react"
import axios from "axios"
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import "./CovidTracking.css"

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class CovidTracking extends React.Component {
  constructor() {
    super()
    this.state = {
      covidData: []
    }
  }

  componentDidMount() {
    axios.get('https://api.covidtracking.com/v1/states/ca/daily.json')
      .then(response => {
        this.setState({
          covidData: response.data
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.covidData.state}<br></br>
        {this.state.covidData.date}<br></br>
        Api call goes here

      </div>
    )
  }
}

export default CovidTracking