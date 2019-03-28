import React, { Component } from 'react'
import { Image, Dropdown } from 'semantic-ui-react'
import classes from './HomePages.module.scss'
import API from '../Services/services'

class HomePages extends Component {

  state = {
    cities: [],
    textCurrent: '',
    page: 0,
    selectedCity: {}
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

    } catch (error) {
      console.log(error)
    }
  }

  onChangeHandler = (event, data) => {
    const selectedCity = this.state.cities.filter((city) => {
      if (city.id === data.value) {
        return true
      }

      return false
    })

    if (selectedCity.length > 0) {
      this.setState({selectedCity: this.parseCity(selectedCity[0], null)})
    }
  }

  parseCity = (data, index) => {
    const cityData = {
      country_id: data.country_id,
      text: data.name,
      value: data.id,
      image: { avatar: true, src: data.country_flag_url }
    }

    if (index) {
      return {...cityData, index}
    }

    return cityData
  }

  render() {
    let citiesOption = []
    this.state.cities.map((data, index) => {
      let city = this.parseCity(data, index)
      return citiesOption.push(city)
    })

    return (
      <div className={classes.HomePages}>
        <Image className={classes.Images} src='https://images.immediate.co.uk/volatile/sites/2/2017/07/Coppa-Club-PWF-0132-HDR.jpg?quality=45&resize=960,413' fluid />
        <Dropdown
            className={classes.Dropdown}
            placeholder='Select City'
            search
            selection
            onChange={this.onChangeHandler}
            onInput={this.isOnInput}
            options={citiesOption}
          />
      </div>
    )
  }
}

export default HomePages