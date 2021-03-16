import "../styling/USDataBlock.css"
import React from "react"

class USDataBlock extends React.Component {


  render() {
    const roundICUPercentage = Math.round(this.props.ICUCapacityPercentage * 100)
    return (
      <div className="statistics">
        {this.props.handleStateChange}
        <div className="ui mini statistics">
          <div className={this.props.riskLevel === 0 ? `blue statistic` : this.props.riskLevel === 1 ? `green statistic` : this.props.riskLevel === 2 ? `yellow statistic` : this.props.riskLevel === 3 ? `orange statistic` : this.props.riskLevel === 4 ? `grey statistic` : `red statistic` }>
            <div className="value">
              {this.props.riskLevel}
            </div>
            <div className="label">
              Risk Level
            </div>
          </div>
          <div className={ roundICUPercentage > 75 ? `red statistic` : roundICUPercentage > 50 ? `orange statistic` : `yellow statistic`}>
            <div className="value">
              {roundICUPercentage}%
            </div>
            <div className="label">
              ICU Capacity Percentage
            </div>
          </div>
          <div className="statistic">
            <div className="value">
              {this.props.newCases}
            </div>
            <div className="label">
              New Cases
            </div>
          </div>
          <div className="statistic">
            <div className="value">
              {this.props.newDeaths }
            </div>
            <div className="label">
              New Deaths
            </div>
          </div>
        </div>

        <div className="ui mini statistics">
          <div className="statistic">
            <div className="value">
              {this.props.deaths}
            </div>
            <div className="label">
              Deaths
            </div>
          </div>
          <div className="statistic">
            <div className="value">
              {this.props.cases}
            </div>
            <div className="label">
              Cases
            </div>
          </div>
          <div className="statistic">
            <div className="value">
              {this.props.vaccinesDistributed}
            </div>
            <div className="label">
              Vaccines Distributed
            </div>
          </div>
          <div className="statistic">
            <div className="value">
              {this.props.vaccinesCompleted}
            </div>
            <div className="label">
              Vaccines Completed
            </div>
          </div>
        </div>
      </div>
    ) 
  }

}

export default USDataBlock


