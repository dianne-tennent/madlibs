import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router>
        <Switch>
          <App />
        </Switch>
    </Router>
    </Provider>,
    document.getElementById('app')
  )
})
