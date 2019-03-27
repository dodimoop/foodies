import React, { Component } from 'react'
import './App.module.scss'
import HeaderLayouts from './Layouts/HeaderLayouts'
import HomePages from './Pages/HomePages'
// import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderLayouts />
        <HomePages />
      </div>
    );
  }
}

export default App;
