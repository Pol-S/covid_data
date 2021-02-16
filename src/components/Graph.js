import React from "react"
import * as V from "victory";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryBrushContainer, VictoryZoomContainer } from 'victory';

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }
  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }


  render() {
    const covidData = this.props.covidData.map((data) => {
      const dateString = data.date.toString();
      const year = dateString.substring(0, 4);
      const yearNum = parseInt(year)
      const month = dateString.substring(4, 6);
      const monthNum = parseInt(month)
      const day = dateString.substring(6);
      const dayNum = parseInt(day)
      return {
        x: new Date(yearNum, monthNum, dayNum), 
        y: data.total,
        day: day
      }
    })
    console.log(covidData.filter(data => data.day == 13))
    return (
      <div>
          <VictoryChart
            width={550}
            height={300}
            scale={{x: "time"}}
            containerComponent={
              <VictoryZoomContainer responsive={false}
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={covidData}
            />
          </VictoryChart>
          <VictoryChart
            width={550}
            height={90}
            scale={{x: "time"}}
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickValues={covidData.filter(data => data.day == 13).map((data) => {
                return data.x
              })}
              tickFormat={(x) => new Date(x).getMonth()}
            />
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={covidData}
            />
          </VictoryChart>

      </div>
    );
  }
}
// [
//   new Date(2020, 3, 4),
//   new Date(2020, 4, 4),
//   new Date(2020, 5, 4),
//   new Date(2020, 6, 4),
//   new Date(2020, 7, 4),
//   new Date(2020, 8, 4),
//   new Date(2020, 9, 4),
//   new Date(2020, 10, 4),
//   new Date(2020, 11, 4),
//   new Date(2020, 12, 4),
//   new Date(2021, 1, 4),
//   new Date(2021, 2, 4),
// ]
export default Graph