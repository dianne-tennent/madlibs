const express = require('express')
const path = require('path')

const madlibRoutes = require('./routes/madlibs')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/madlibs', madlibRoutes)

module.exports = server
