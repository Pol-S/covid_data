import React from "react"
import * as V from "victory";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryBrushContainer, VictoryZoomContainer } from 'victory';
import CovidTracking from "../api/CovidTracking"

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {};
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
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6);
      console.log(year, month, day);
      return {
        x: new Date(year, month, day), 
        y: data.total
      }
    })
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
              tickValues={covidData.map(data => data.x.day === "20")}
              // covidData.map{|data| 
            // if data.x.day == 01
            //
          //}
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={covidData}
            />
          </VictoryChart>
          <CovidTracking />
      </div>
    );
  }
}

export default Graph