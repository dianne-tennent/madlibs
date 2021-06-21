import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router>
      <App />
    </Router>
    </Provider>,
    document.getElementById('app')
  )
})
