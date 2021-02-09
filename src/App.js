import React from "react"
import Header from "./components/Header"
import Graph from "./components/Graph"
import Footer from "./components/Footer"
import axios from "axios"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      covidData: []
    }
  }

  componentDidMount() {
    axios.get('https://api.covidtracking.com/v1/states/ca/daily.json')
      .then(response => {
        this.setState({
          covidData: response.data
        })
      })
  }
  
  render() {
    return(
      <div>
        <Header />
        <div className="ui divider">
          Introduction paragraph goes here or something.
        </div>
        <Graph covidData={this.state.covidData}/>
        <Footer />
      </div>
    )
  }
}

export default App;