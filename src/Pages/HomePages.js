import React, { Component } from 'react'
import _ from 'lodash'
import { Image, Dropdown } from 'semantic-ui-react'
import classes from './HomePages.module.scss';
import API from '../Services/services'

class HomePages extends Component {

  state = {
    cities: [],
    page: 0
  }

  async componentDidMount() {
    await this.isFetchCities()
  }

  isFetchCities = async () => {
    try {
      
      let response = await API.get('/v2.1/cities')
      console.log(response);


    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.HomePages}>
        <Image className={classes.Images} src='https://images.immediate.co.uk/volatile/sites/2/2017/07/Coppa-Club-PWF-0132-HDR.jpg?quality=45&resize=960,413' fluid />
        <Dropdown className={classes.Dropdown} placeholder='State' search selection options={this.cities} />
      </div>
    )
  }
}

export default HomePages