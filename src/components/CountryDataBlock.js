import React from 'react'

const CountryDataBlock = ({dailyCases, dailyDeaths, totalCases, totalDeaths, totalCritical, deathRate, recoveryRate, casesPerMillion, currentCountry}) => {

  const roundRecoveryRate = Number(parseFloat(recoveryRate).toFixed(2))
  const roundDeathRate = Number(parseFloat(deathRate).toFixed(2))
  return (
    <div className="statistics">
      <div className="country-name">
        <h2 className="ui header">
          {currentCountry}
        </h2>
      </div>
      <div className="ui mini statistics">
        <div className={ roundRecoveryRate > 90 ? `green statistic` : roundRecoveryRate < 90 && roundRecoveryRate >= 80 ? `yellow statistic` : roundRecoveryRate < 80 && roundRecoveryRate >= 70 ? `red statistic` : `maroon statistic`}>
          <div className="value">
            {roundRecoveryRate}%
          </div>
          <div className="label">
            Recovery Rate
          </div>
        </div>
        <div className="statistic">
          <div className="value">
            {roundDeathRate}%
          </div>
          <div className="label">
            Death Rate
          </div>
        </div>
        <div className="statistic">
          <div className="value">
            {totalCritical}
          </div>
          <div className="label">
            Total Critical
          </div>
        </div>
        <div className="statistic">
          <div className="value">
            {casesPerMillion}
          </div>
          <div className="label">
            Cases Per Million
          </div>
        </div>
      </div>

      <div className="ui mini statistics">
        <div className="statistic">
          <div className="value">
            {totalCases}
          </div>
          <div className="label">
            Total Cases
          </div>
        </div>
        <div className="statistic">
          <div className="value">
            {totalDeaths}
          </div>
          <div className="label">
            Total Deaths
          </div>
        </div>
        <div className="statistic">
          <div className="value">
            {dailyCases}
          </div>
          <div className="label">
            New Cases
          </div>
        </div>
        <div className="statistic">
          <div className="value">
            {dailyDeaths}
          </div>
          <div className="label">
            New Deaths
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDataBlock