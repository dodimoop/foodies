import React, { Component } from 'react'
import './App.module.scss'
import HomePages from './Pages/HomePages/HomePages'
import ResultPages from './Pages/ResultPages/ResultPages'
import DetailPages from './Pages/DetailPages/DetailPages';
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route path="/" exact component={HomePages} />
        <Route path="/result" component={ResultPages}/>
        <Route path="/detail-result" component={DetailPages}/>
        <Route path="*" render={() => <Redirect to="/"/>}/>
      </Switch>
      </div>
    );
  }
}

export default App;
