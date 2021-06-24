import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'


//components
import Home from './Home'
import HowToPlay from './HowToPlay'
import ChooseStory from './ChooseStory'
import Story from './Story'
import OutPut from './OutPut'
import AddStory from './AddStory'

function App (props) {


  return (
    <>

      <div className='container'>
      <Route exact path='/' component={Home}/>
      <Route exact path='/how' component={HowToPlay}/>
      <Route exact path='/choose' component={ChooseStory}/>
      <Route exact path='/output' component={OutPut}/>
      <Route exact path='/play/:story'>
      <Story />
      </Route>
      <Route exact path='/add' component={AddStory}/>
      </div>

    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    list: globalState.list
  }
}

export default connect(mapStateToProps)(App)
