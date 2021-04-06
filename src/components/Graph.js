import React from "react"
import * as V from "victory";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryBrushContainer, VictoryZoomContainer } from 'victory';

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
      zoomDomain: null,
      months: {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "June",
        6: "July",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
      }
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

  componentDidUpdate(prevProps) {
    if (prevProps.usState !== this.props.usState) {
      this.setState({
        zoomDomain: null
      })
    }
    if (prevProps.yAxis !== this.props.yAxis) {
      this.setState({
        zoomDomain: null
      })
    }
  }

  render() {
    // console.log(this.props.yAxis)
    const covidData = this.props.covidData.map((data) => {
      let yData = data.cases
      if (this.props.yAxis === 'Deaths') {
        yData = data.deaths
      } else if ( this.props.yAxis === 'Hospitalized') {
        yData = data.hospitalBeds.currentUsageCovid
      } else if ( this.props.yAxis === 'Total') {
        yData = data.cases
      } else if (this.props.yAxis === 'Daily Deaths') {
        yData = data.newDeaths
      } else if (this.props.yAxis === 'Daily Cases') {
        yData = data.newCases
      } else if (this.props.yAxis === 'ICU Patients') {
        yData = data.icuBeds.currentUsageCovid
      } else if (this.props.yAxis === 'Vaccinations Completed') {
        if (data.vaccinationsCompleted) {
          yData = data.vaccinationsCompleted
        } else {
          yData = null
        }
      } else if (this.props.yAxis === 'Vaccines Distributed') {
        if (data.vaccinesDistributed) {
          yData = data.vaccinesDistributed
        } else {
          yData = null
        }
      }
      const dateString = data.date.toString();
      const year = dateString.substring(0, 4);
      const yearNum = parseInt(year)
      const month = dateString.substring(5, 7);
      const monthNum = parseInt(month) - 1
      const day = dateString.substring(8);
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
        <div>
          <VictoryChart
            width={600}
            height={300}
            padding={{top: 10, left: 100, right: 50, bottom: 30}}
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
              tickValues={covidData.filter(data => data.day == 20).map((data) => {
                return data.x
              })}
              // tickValues={covidData.filter(data => {
              //   let today = new Date()
              //   let dd = parseInt(today.getDate())
              //   return data.day === dd 
              // }).map((data) => {
              //   console.log(data.x)
              //   return data.x 
              // })}
              tickFormat={(x) => `${this.state.months[x.getMonth()]}`}
              
            />
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={covidData}
              // labels={( datum ) => `${this.state.months[datum.x]}`}
            />
          </VictoryChart>
          </div>
      </div>
    );
  }
}

export default Graph