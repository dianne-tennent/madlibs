import React, { useEffect } from 'react'
import { Link, history } from 'react-router-dom'
import { connect } from 'react-redux'

function Home (props) {


  const navigate = (path) => {
    props.history.push(path)
  }

  return (
    <>
      <div className='header'>
      <h1>Let's Play Madlibs!</h1>
      </div>
      <div className='menu'>
      <button onClick={() => navigate('/how')}>How?</button>
      <button onClick={() => navigate('/choose')}>Play</button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

export default connect(mapStateToProps)(Home)
