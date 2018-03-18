import 'babel-polyfill'
// import devToolsEnhancer from 'remote-redux-devtools'
import WordpressContainer from './containers/WordpressContainer'
import WordpressPostContainer from './containers/WordpressPostContainer'
// import WordpressFlipContainer from './containers/WordpressFlipContainer'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import appSagas from './sagas'
const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const historyMiddleware = routerMiddleware(history)
let middleware = [historyMiddleware, sagaMiddleware]

export const store = createStore(reducer, applyMiddleware(...middleware))

sagaMiddleware.run(appSagas)
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }
  render () {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path='/react-material-pwa/' component={WordpressContainer} />
          <Route path='/react-material-pwa/:year/:month/:day/:pageName' component={WordpressPostContainer} />
          <Route path='/react-material-pwa/about' component={WordpressContainer} />
        </div>
      </ConnectedRouter>
    )
  }
}
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#wordpressContainer'))
