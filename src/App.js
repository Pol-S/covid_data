import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import USAStates from "./components/USAStates"
import Countries from "./components/Countries"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component { 
  render() {
    return(
      <div>
      <Router>
      <Header />
      <Switch>         
        <Route path="/components/usastates" component={USAStates} />     
        <Route path="/components/countries" component={Countries} />  
      </Switch>
      <Footer />
      </Router>
    </div>
    )
  }
}

export default App;

