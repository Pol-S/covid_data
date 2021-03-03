import React from "react"
import * as V from "victory";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryBrushContainer, VictoryZoomContainer } from 'victory';
import './Graph.css'
import moment from 'moment'

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  handleZoom = (domain) => {
    console.log('handlezoom', domain, 'selectedDomain', this.state.selectedDomain)
    this.setState({selectedDomain: domain});
  }
  handleBrush = (domain) => {
    console.log('handlebrush', domain, 'zoomdomain', this.state.zoomDomain)
    this.setState({zoomDomain: domain});
  }


  render() {
    // console.log(this.props.yAxis)
    const covidData = this.props.covidData.map((data) => {
      let yData = data.total
      if (this.props.yAxis === 'death') {
        yData = data.death
      } else if ( this.props.yAxis === 'hospitalized') {
        yData = data.hospitalizedCurrently
      } else if ( this.props.yAxis === 'total') {
        yData = data.total
      } else if (this.props.yAxis === 'deathIncrease') {
        yData = data.deathIncrease
      } else if (this.props.yAxis === 'positiveIncrease') {
        yData = data.positiveIncrease
      } else if (this.props.yAxis === 'inIcuCurrently') {
        yData = data.inIcuCurrently
      } 
      const dateString = data.date.toString();
      const year = dateString.substring(0, 4);
      const yearNum = parseInt(year)
      const month = dateString.substring(4, 6);
      const monthNum = parseInt(month) - 1
      const day = dateString.substring(6);
      const dayNum = parseInt(day)
      return {
        x: new Date(yearNum, monthNum, dayNum), 
        y: yData,
        day: day
      }
    })
    // console.log(covidData.filter(data => data.day == 13))
    return (
      <div>
        <div className="graph">
          <VictoryChart
            width={600}
            height={300}
            padding={{top: 0, left: 100, right: 50, bottom: 30}}
            scale={{x: "time"}}
            containerComponent={
              <VictoryZoomContainer responsive={false}
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom}
              />
            }
          >
            <VictoryLine
            className="victory"
              style={{
                data: {stroke: "tomato"}
              }}
              data={covidData}
            />
          </VictoryChart>
          <VictoryChart
            width={600}
            height={90}
            scale={{x: "time"}}
            padding={{top: 0, left: 100, right: 50, bottom: 30}}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush}
              />
            }
          >
            <VictoryAxis
              tickValues={covidData.filter(data => {
                let today = new Date()
                let dd = parseInt(today.getDate())
                return data.day === dd 
              }).map((data) => {
                console.log(data.x)
                return data.x 
              })}
              // covidData.filter(data => {
              //   let today = new Date()
              //   let dd = parseInt(today.getDate())
              //   let mm = parseInt(today.getMonth())
              //   let yyyy = parseInt(today.getFullYear())
              //   return data.day === yyyy //&& data.month <= mm && data.year <= yyyy
              // }).map((data) => {
              //   console.log(data.x)
              //   return data.x 
              // })}
              tickFormat={(x) => new Date(x).getMonth()}
                            //REVIEW THIS 
              // tickFormat={
              //   (x) => {
              //     if (x.getFullYear() === 2000) {
              //       return x.getFullYear();
              //     }
              //     if (x.getFullYear() % 5 === 0) {
              //       return x.getFullYear().toString().slice(2);
              //     }
              //   }
              // }
            />
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={covidData}
            />
          </VictoryChart>
          </div>
      </div>
    );
  }
}

export default Graph