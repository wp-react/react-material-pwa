/**
 * Created by brsmith on 7/3/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { WordpressRedux } from 'wp-react-core'
import SingleLayout from '../components/SingleLayout'
import MaterialNavBar from '../components/MaterialNavBar'
const { WordpressActions } = WordpressRedux

class WordpressPostContainer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = props
    this.page = 1
  }

  componentDidMount () {
    if (this.props.match.params.pageName && !Number.isInteger(this.props.match.params.pageName)) {
      this.props.wpSlugRequested({pageName: this.props.match.params.pageName})
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState(newProps)
  }

  onChange () {

  }

  render () {
    return (
      <div>
        <MaterialNavBar />
        <SingleLayout post={this.state.post} key={0} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    fetching: state.wp.fetching,
    posts: state.wp.posts,
    post: state.wp.post
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    wpSlugRequested: (payload) => dispatch(WordpressActions.wpSlugRequested(payload)),
    wpPageRequested: (payload) => dispatch(WordpressActions.wpPageRequested(payload)),
    wpAllRequested: (payload) => dispatch(WordpressActions.wpAllRequested(payload)),
    getPosts: (payload) => dispatch(WordpressActions.getPosts(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordpressPostContainer)
