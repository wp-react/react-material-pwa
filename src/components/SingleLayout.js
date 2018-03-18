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

class SingleLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {...props, wpCardsArr: []}
    this.grid = null
  }

  componentWillReceiveProps (newProps) {
    this.setState(newProps, () => {
      if (this.state.post) this.generateCards()
    })
  }

  generateCards = () => {
    let wpCardsArr = []
    const contentObj = wpContent(this.state.post)
    wpCardsArr.push(
      <Grid key={0} item xs style={{
        flexDirection: 'column',
        display: 'flex'
      }}>
        <WPCard className={this.props.classes.paper} contentObj={contentObj} />
      </Grid>)
    this.setState({wpCardsArr: wpCardsArr})
  }

  getSingleCard = () => {
    const valueToRender = this.state.wpCardsArr && this.state.wpCardsArr.length ? this.state.wpCardsArr : null
    if (this.state.wpCardsArr.length) {
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
        {
          this.getSingleCard()
        }
      </div>
    )
  }
}

SingleLayout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleLayout)
