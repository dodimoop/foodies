import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import classes from './HeaderLayouts.module.scss';

const HeaderLayouts = () => (
  <Segment className={classes.HeaderLayouts} clearing>
    <Header floated='left'>
      <h1 className={classes.colorText}>
        F O O D I E S .
      </h1>
    </Header>
  </Segment>
)

export default HeaderLayouts