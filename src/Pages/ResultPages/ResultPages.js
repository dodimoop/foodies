import React, { Component } from 'react'
import queryString from 'query-string'
import HeaderLayouts from '../../Components/HeaderLayouts'
import API from '../../Services/services'
import { Grid, Image, Card, Dimmer, Loader, Label, Button, Icon } from 'semantic-ui-react'
import classes from './ResultPages.module.scss';

class ResultPages extends Component {
  
  state = {
      restaurants: [],
      isLoading: false,
      isLoadingLoadmore: false,
      page: 0,
      count: 6,
      start: 0  
  }

  async componentDidMount() {
    await this.isFetchData()
  }

  isFetchData = async () => {
    try {
      let dataQueryString = queryString.parse(this.props.location.search)
      this.setState({restaurants: [], isLoading: true, isLoadingLoadmore: true})
        let response = await API.get('v2.1/search', {
          params: {
            entity_id: dataQueryString.cityId,
            entity_type: "city",
            q: dataQueryString.q,
            page: this.state.page,
            count: this.state.count
          }
        })

        if (response) {
          await this.setState({restaurants: response.data.restaurants, isLoading: false, isLoadingLoadmore: false})
        }
        
    } catch (error) {
      console.log(error);
    }
  }

  cardOnClick = (data) => {
    const idRestaurant = data.restaurant.id
    window.localStorage.clear()
    window.localStorage.setItem('currentRestaurant', JSON.stringify(data))
    this.props.history.push(`detail-result/${idRestaurant}`)
  }

  isLoadmore = async () => {
    try {
      await this.setState(prevState => {
        return {
          isLoadingLoadmore: true,
          page: prevState.page + 1,
          start: this.state.start + 6
        }
      })

      let dataQueryString = queryString.parse(this.props.location.search)
      this.props.history.push(`/result?cityId=${dataQueryString.cityId}&q=${dataQueryString.q}&page=${this.state.page}`)
      let response = await API.get('v2.1/search', {
        params: {
          entity_id: dataQueryString.cityId,
          entity_type: "city",
          q: dataQueryString.q,
          page: this.state.page,
          count: this.state.count,
          start: this.state.start
        }
      })
      
      if (response) {
        await this.setState(prevState => {
          return {
            restaurants: prevState.restaurants.concat(response.data.restaurants),
            isLoadingLoadmore: false
          }
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  backHome = async () => {
    try {
      await this.setState({restaurants: []})
      this.props.history.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let dataRestaurants
    if (this.state.isLoading || this.state.restaurants.length < 0) {
      dataRestaurants = (
        <Dimmer active inverted>
					<Loader inverted content='Loading' />
				</Dimmer>
      )
    } else {
      dataRestaurants = (
        this.state.restaurants.map((data, key) => (
          <Grid.Column className={classes.gridColumn} key={key} width={5}>
            <Card centered onClick={() => this.cardOnClick(data)} key={data.restaurant.id}  className={classes.Card}>
              <div>
                <Label.Group className={classes.Label}>
                  <Label className={classes.labelRating} color='green' data-tooltip={data.restaurant.user_rating.rating_text}>{data.restaurant.user_rating.aggregate_rating}</Label>
                </Label.Group>
              </div>
              <Image className={classes.Image} src={data.restaurant.thumb} />
              <Card.Content className={classes.Content}>
                <Card.Header>{data.restaurant.name}</Card.Header>
                <Card.Description>{data.restaurant.location.address}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))
      )
    }
    return (
      <div className={classes.ResultPages}>
        <HeaderLayouts match={this.props.match}/>
        <Grid className={classes.Grid}>
          <Grid.Row>
            {dataRestaurants}
          </Grid.Row>
        </Grid>
        <div className={classes.buttonLoadmore}>
          <Button onClick={() => this.isLoadmore()} loading={this.state.isLoadingLoadmore}>
            Load More
          </Button>
        </div>
        <div className={classes.buttonBack}>
          <Button icon labelPosition='left' onClick={this.backHome} color="red">
            Back to Home Page
            <Icon name='left arrow' />
          </Button>
        </div>
      </div>
    )
  }

}

export default ResultPages