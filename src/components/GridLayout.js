import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import * as R from 'ramda'
import Grid from 'material-ui/Grid'
import { wpContent } from 'wp-react-core'
import WPCard from './WPCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 10,
    marginTop: 70
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class GridLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {...props, wpCardsArr: []}
    this.grid = null
  }

  componentWillReceiveProps (newProps) {
    this.setState(newProps, () => {
      if (this.state.posts.length) this.generateCards()
    })
  }

  generateCards = () => {
    let wpCardsArr = []
    R.forEachObjIndexed((value, key) => {
      const contentObj = wpContent(value)
      wpCardsArr.push(
        <Grid key={key} item xs style={{
          flexDirection: 'column',
          display: 'flex'
        }}>
          <WPCard length={(this.state.posts.length > 1)} className={this.props.classes.paper} contentObj={contentObj} />
        </Grid>)
    }
      , this.state.posts)
    this.setState({wpCardsArr: wpCardsArr})
    this.createGrid(wpCardsArr)
  }

  createGrid = (wpCardsArr) => {
    this.grid = []
    let row = []
    for (let i = 0; i < this.state.posts.length; i++) {
      if (i % 3 === 0) {
        if (row.length) this.grid.push(row)
        row = []
      }
      row.push(wpCardsArr[i])
    }
    this.setState({grid: this.grid})
  }

  getSingleCard = () => {
    const valueToRender = this.state.wpCardsArr && this.state.wpCardsArr.length ? this.state.wpCardsArr : null
    if (this.grid && !this.grid.length && this.state.wpCardsArr.length) {
      return valueToRender.map((item, index) => {
        return (
          <div key={index}>
            {item}
          </div>
        )
      })
    } else {
      return null
    }
  }

  render () {
    return (
      <div className={this.props.classes.root}>
        {this.grid && this.grid.map((item, index) => {
          return (
            <Grid container key={index} spacing={24}>
              {item[0]}
              {item[1]}
              {item[2]}
            </Grid>
          )
        })}
        {
          this.getSingleCard()
        }
      </div>
    )
  }
}

GridLayout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GridLayout)
