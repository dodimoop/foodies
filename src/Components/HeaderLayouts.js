import React, { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react'
import classes from './HeaderLayouts.module.scss';

class HeaderLayouts extends Component {
  render() {
    let headerHandler
    if (this.props.match.url === '/result') {
      headerHandler = ( 
        <h1 className={classes.colorText}>
          Search Results
        </h1>
      )
    } else if (this.props.match.url === '/detail-result') {
      headerHandler = (
        <h1 className={classes.colorText}>
          Restaurant Details
        </h1>
      )
    }
    return (
      <Segment className={classes.HeaderLayouts} clearing>
        <Header floated='left'>
         {headerHandler}
        </Header>
      </Segment>
    )
  }
}


export default HeaderLayouts