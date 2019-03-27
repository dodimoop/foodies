import React, { Component } from 'react'
import { Image, Dropdown } from 'semantic-ui-react'
import classes from './HomePages.module.scss'
import API from '../Services/services'

class HomePages extends Component {

  state = {
    cities: [],
    textCurrent: '',
    page: 0
  }

  async componentDidMount() {
    await this.isOnInput()
  }

  isOnInput = async (event) => {
    try {
      let textCurrent = event.target.value
      let response = await API.get('/v2.1/cities', {
        params: {
          q: textCurrent
        }
      })

      if(response) {
        await this.setState({cities: response.data.location_suggestions})
      }

      // console.log(this.state.cities);
      
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let citiesOption = []
    this.state.cities.map(data => {
      let city = {
        key: data.country_id,
        text: data.name,
        value: data.name,
        image: { avatar: true, src: data.country_flag_url }
      }
      return citiesOption.push(city)
    })
    // console.log(citiesOption)
    // console.log(this.state.cities)
    return (
      <div className={classes.HomePages}>
        <Image className={classes.Images} src='https://images.immediate.co.uk/volatile/sites/2/2017/07/Coppa-Club-PWF-0132-HDR.jpg?quality=45&resize=960,413' fluid />
        <Dropdown
            className={classes.Dropdown}
            placeholder='Jakarta'
            search
            selection
            selected
            onInput={this.isOnInput}
            options={citiesOption}
          />
      </div>
    )
  }
}

export default HomePages