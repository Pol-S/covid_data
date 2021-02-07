import React from "react"
import Header from "./components/Header"
import Graph from "./components/Graph"
import Footer from "./components/Footer"

class App extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <div className="ui divider">
          Introduction paragraph goes here or something.
        </div>
        <Graph />
        <Footer />
      </div>
    )
  }
}

export default App;