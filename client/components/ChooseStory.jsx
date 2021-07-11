import React from 'react'

function ChooseStory (props) {
  return (
    <>
      <div>
        <div className="header">
          <div className="home-icon-container">
            <img
              onClick={() => props.history.push('/')}
              src="/images/home.png"
            />
          </div>
          <div className="heading-container">
            <h1>Choose a story</h1>
          </div>
        </div>
        <div className="menu story-menu">
          <button onClick={() => props.history.push('/add')}>
            Create my own!
          </button>
          <button onClick={() => props.history.push('/play/love_letter')}>
            <img className="story-image-button" src="/images/heart.png" />
          </button>
          <button onClick={() => props.history.push('/play/job_application')}>
            <img className="story-image-button" src="/images/resume.png" />
          </button>
          <button
            onClick={() => props.history.push('/play/letter_to_the_editor')}
          >
            <img className="story-image-button" src="/images/newspaper.png" />
          </button>
        </div>
      </div>
    </>
  )
}

export default ChooseStory
