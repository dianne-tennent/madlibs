const express = require('express')

const db = require('../db/madlibs')

const router = express.Router()



router.get('/:story', (req, res) => {
  const story = req.params.story
  db.getStoryByName(story)
    .then(results => {
      res.json(results)
      return null
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
