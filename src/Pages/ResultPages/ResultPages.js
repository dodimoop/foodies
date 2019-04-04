import React, { Component } from 'react'
import queryString from 'query-string'
import HeaderLayout from '../../Components/HeaderLayouts'
import API from '../../Services/services'
import { Grid, Image, Card } from 'semantic-ui-react'
import classes from './ResultPages.module.scss';

class ResultPages extends Component {

  async componentDidMount() {
    try {
      let dataQueryString = queryString.parse(this.props.location.search)
  
      this.setState({foodies: []})
        
        let response = await API.get('v2.1/search', {
          params: {
            entity_id: dataQueryString.cityId,
            entity_type: "city",
            q: dataQueryString.q,
            count: 6
          }
        })
        console.log(response);
    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (
      <div className={classes.ResultPages}>
        <HeaderLayout />
        <Grid className={classes.Grid}>
          <Grid.Row>
            <Grid.Column width={3}>
            <Card className={classes.Card}>
              <Image className={classes.Image} src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
              <Card.Content className={classes.Content}>
                <Card.Header>NAMA RESTAURANT</Card.Header>
                <Card.Description>ALAMAT RESTAURANT</Card.Description>
              </Card.Content>
            </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

export default ResultPages