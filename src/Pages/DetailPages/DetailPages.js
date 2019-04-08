import React, { Component } from 'react'
import classes from './DetailsPages.module.scss'
import HeaderLayouts from '../../Components/HeaderLayouts'
import { Grid, Image} from 'semantic-ui-react'

class DetailPages extends Component {
  render() {
    return (
      <div className={classes.detailPages}>
        <HeaderLayouts match={this.props.match}/>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default DetailPages