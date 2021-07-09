import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'


//components
import Home from './Home'
import HowToPlay from './HowToPlay'
import ChooseStory from './ChooseStory'
import Story from './Story'
import OutPut from './OutPut'
import AddStory from './AddStory'
import Footer from './Footer'

function App () {


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
      <Route path='/'>
      <Footer /></Route>
      </div>

    </>
  )
}


export default App
