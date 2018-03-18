import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    width: '100%',
    minHeight: 300,
    flex: 1
  },
  media: {
    width: '100%',
    height: 300
  }
}

class WPCard extends React.Component {
  componentDidMount () {
    if (document.querySelector('.loader')) document.querySelector('.loader').hidden = true
  }

  renderCardActions = () => {
    if (this.props.length) {
      return (
        <div>
          <Button size='small' color='primary'>
            Share
          </Button>
          <Button component={Link} size='small' color='primary' to={`./${this.props.contentObj.link}`}>
            Learn More
          </Button>
        </div>
      )
    } else {
      return (
        <div>
          <Button size='small' color='primary' component={Link} to={'/'} >
            Go Back
          </Button>
        </div>
      )
    }
  }

  render () {
    return (
      <Card className={this.props.classes.card} style={{
        flexDirection: 'column',
        display: 'flex'
      }}>
        <CardMedia
          className={this.props.classes.media}
          image={this.props.contentObj.image}
          title={this.props.contentObj.title}

        />
        <CardContent>
          <Typography variant='headline' component='h2'>
            {this.props.contentObj.title}
          </Typography>
          <Typography component='p' dangerouslySetInnerHTML={{__html: this.props.length ? this.props.contentObj.excerpt : this.props.contentObj.body}} />
        </CardContent>
        <CardActions style={{
          justifyContent: 'flex-end',
          flex: 1,
          alignItems: 'flex-end'
        }}>
          {
            this.renderCardActions()
          }
        </CardActions>
      </Card>
    )
  }
}

WPCard.propTypes = {
  classes: PropTypes.object.isRequired,
  contentObj: PropTypes.object.isRequired
}

export default withStyles(styles)(WPCard)
