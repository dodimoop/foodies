import React, { Component } from 'react'
import { Image, Dropdown, Grid, Button, Icon, Input } from 'semantic-ui-react'
import classes from './HomePages.module.scss'
import API from '../../Services/services'

class HomePages extends Component {

  state = {
    cities: [],
    selectedCity: {},
    page: 0,
    foodies: [],
    selectedFood: {},
    textCurrentFood: ''
  }

  async componentDidMount() {
    await this.isOnInput()
    await this.resetComponent()
  }

  isOnInput = async (event) => {
    try {
      let textCurrent = event.target.value
      let response = await API.get('/v2.1/cities', {
        params: {
          q: textCurrent
        }
      })

      if (response) {
        await this.setState({cities: response.data.location_suggestions})
      }

    } catch (error) {
      console.log(error)
    }
  }

  onChangeHandler = (event, data) => {
    this.setState({
      foodies: [], 
      textCurrentFood: ''
    })

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

  resetComponent = async () => {
    await this.setState({ foodies: [], textCurrentFood: '' })
  }

  onSearchFood = () => {
    this.props.history.push(`/result?cityId=${this.state.selectedCity.value}&q=${this.state.textCurrentFood}`)
  }

  parseFood = (data, index) => {
    const foodData = {
      key: data.restaurant.id,
      id: data.restaurant.id,
      title: data.restaurant.name,
      price: data.restaurant.currency + ' ' + data.restaurant.average_cost_for_two,
      image: data.restaurant.thumb,
      description: data.restaurant.location.locality_verbose
    }

    if (index) {
      return {...foodData, index}
    }

    return foodData
  }

  onInputHanlder = async (event) => {
    let queryText = event.target.value
    await this.setState({textCurrentFood: queryText})

    if (this.state.textCurrentFood.length < 1) {
      this.resetComponent()
    }
  }

  render() {
    let citiesOption = []
    this.state.cities.map((data, index) => {
      let city = this.parseCity(data, index)
      return citiesOption.push(city)
    })
    
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

    let foodiesData = []
    this.state.foodies.map((data, index) => {
      let food = this.parseFood(data, index)
      return foodiesData.push(food)
    })

    return (
      <div className={classes.HomePages}>
        <div className={classes.textFoodies}>
          <h1 className={classes.fontSize}>Food Finder</h1>
        </div>
        <Image 
          className={classes.Images} 
          src='https://images.immediate.co.uk/volatile/sites/2/2017/07/Coppa-Club-PWF-0132-HDR.jpg?quality=45&resize=960,413' 
          fluid 
        />
        <div className={classes.Grid}>
          <Grid>
            <Grid.Column className={classes.gridColumnCities} width={6}>
              {dropdown}
            </Grid.Column>
            <Grid.Column className={classes.gridColumnRestaurant} width={6}>
              <Input 
                className={classes.Search} 
                placeholder='Search restaurants or food'
                onInput={this.onInputHanlder} 
              >
                <input />
              </Input>
            </Grid.Column>
            <Grid.Column className={classes.gridColumnSearch} width={4}>
              <Button 
                className={classes.buttonSearch} 
                icon 
                labelPosition='right'
                color='green'
                onClick={this.onSearchFood} >
                Search
                <Icon name='search' />
              </Button>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

export default HomePages