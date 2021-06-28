import React from 'react'

function ChooseStory(props) {
    return (
        <>
        <div>
            <div className="home-header">
                <h1>Choose a story</h1>
            </div>
            <div className="menu">
                <button onClick={() => props.history.push('/add')}>Add my own</button>
                <button onClick={() => props.history.push('/play/love_letter')}>Love Letter</button>
                <button onClick={() => props.history.push('/play/job_application')}>Job Application</button>
                <button onClick={() => props.history.push('/play/letter_to_the_editor')}>Letter to the Editor</button>
            </div>
        </div>
        </>
    )
}

export default ChooseStory
