const express = require('express')

const db = require('../db/madlibs')

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


