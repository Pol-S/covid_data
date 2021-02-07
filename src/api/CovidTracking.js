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
    axios.get('https://api.covidtracking.com/v1/states/ca/20200501.json')
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
        <div className="victory">
          <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          >
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
              <VictoryBar
                data={data}
                x="quarter"
                y="earnings"
              />
          </VictoryChart>
        </div>
      </div>
    )
  }
}

export default CovidTracking