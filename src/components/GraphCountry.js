import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryBrushContainer, VictoryZoomContainer } from 'victory';

class GraphCountry extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  handleFakeZoom() {
    // const dummyDomain = {{[-1, 1]}};
    // this.setState(selectedDomain: dummyDomain);
  }

  render() {
    const covidData = this.props.covidCountryData.map((data) => {
      let yData = data.confirmed
      if (this.props.yAxisCountries === 'confirmed') {
        yData = data.confirmed
      } else if ( this.props.yAxisCountries === 'deaths') {
        yData = data.deaths
      } else if ( this.props.yAxisCountries === 'recovered') {
        yData = data.recovered
      } else if (this.props.yAxisCountries === 'new_deaths') {
        yData = data.new_deaths
      } else if (this.props.yAxisCountries === 'active') {
        yData = data.active
      } 
      const dateString = data.date
      const year = dateString.substring(0, 4);
      // console.log(year)
      const yearNum = parseInt(year)
      const month = dateString.substring(5, 7);
      // console.log(month)
      const monthNum = parseInt(month) - 1
      const day = dateString.substring(8, 10);
      // console.log(day)
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
                onZoomDomainChange={this.handleZoom.bind(this)}
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
                onBrushDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickValues={covidData.filter(data => data.day == 20).map((data) => {
                return data.x
              })}
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


export default GraphCountry