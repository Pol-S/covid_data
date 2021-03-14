import React from "react"

class USDataBlock extends React.Component {
  constructor() {
    super()
    this.state = {
      deaths: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deaths: nextProps.currentCovidData.actuals.deaths
    }),
    console.log(this.state.deaths)
  }

  render() {
    return (
      <div>
        {/* Deaths: {this.props.currentCovidData.actuals.deaths}
        Cases: {this.props.currentCovidData.actuals.cases}
        Vaccines distributed: {this.props.currentCovidData.actuals.vaccinesDistributed}
        Vaccines completed: {this.props.currentCovidData.actuals.vaccinationsCompleted}
        Risk level: {this.props.currentCovidData.risklevels.overall}
        ICU capacity percentage: {this.props.currentCovidData.metrics.icuCapacityRatio}
        New cases: {this.props.currentCovidData.actuals.newCases}
        New deaths: {this.props.currentCovidData.actuals.newDeaths} */}
      </div>
    ) 
  }

}

export default USDataBlock