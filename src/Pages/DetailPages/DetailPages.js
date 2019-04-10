import React, { Component } from 'react'
import classes from './DetailsPages.module.scss'
import HeaderLayouts from '../../Components/HeaderLayouts'
import { Grid, Image, Container } from 'semantic-ui-react'

class DetailPages extends Component {

  state = {
    restaurantDetails: null
  }

  async componentDidMount() {
    await this.getRestaurant()
  }

  getRestaurant = async () => {
    let dataRestaurant = JSON.parse(localStorage.getItem('currentRestaurant'))
    await this.setState({restaurantDetails: dataRestaurant})
  }

  render() {
    
    let detailRestaurant
    if (this.state.restaurantDetails) {
      detailRestaurant = (
        <Grid className={classes.Grid} columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Image className={classes.Image} src={this.state.restaurantDetails.restaurant.featured_image} size="large" />
            </Grid.Column>
            <Grid.Column>
              <Container>
                <h1>{this.state.restaurantDetails.restaurant.name}</h1>
                <p><b>Address:</b> <br/>{this.state.restaurantDetails.restaurant.location.address}</p>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

    return (
      <div className={classes.detailPages}>
        <HeaderLayouts match={this.props.match}/>
        {detailRestaurant}
      </div>
    )
  }
}

export default DetailPages