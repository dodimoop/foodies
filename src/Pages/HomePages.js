import React, { Component } from 'react'
import { Image, Dropdown, Grid, Search } from 'semantic-ui-react'
import classes from './HomePages.module.scss'
import API from '../Services/services'

class HomePages extends Component {

  state = {
    cities: [],
    textCurrent: '',
    page: 0,
    selectedCity: {},
    isLoading: false
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
    if (this.state.cities.length > 0) {
      console.log(this.state.cities[0].id);
    }
    let dropdown
    if (this.state.cities) {
      dropdown = (
        <Dropdown
          className={classes.Dropdown}
          placeholder='Select City'
          search
          selection
          onChange={this.onChangeHandler}
          onInput={this.isOnInput}
          options={citiesOption}
        />
      )
    }
    
    return (
      <div className={classes.HomePages}>
        <Image 
          className={classes.Images} 
          src='https://images.immediate.co.uk/volatile/sites/2/2017/07/Coppa-Club-PWF-0132-HDR.jpg?quality=45&resize=960,413' 
          fluid 
        />
        <div className={classes.Grid}>
          <Grid>
            <Grid.Column className={classes.gridColumnCities} width={8}>
              {dropdown}
            </Grid.Column>
            <Grid.Column className={classes.gridColumnRestaurant} width={8}>
              <Search
                className={classes.Search}
                loading={this.isLoading}
                onResultSelect={this.handleResultSelect}
                // onSearchChange={}
                results={this.results}
                value={this.value}
                {...this.props}
              />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

export default HomePages