import React from "react"
import axios from "axios"

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
      </div>
    )
  }
}

export default CovidTracking