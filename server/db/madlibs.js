const connection = require('./connection')

function getStoryByName (storyName, db = connection) {
  return db('stories')
  .where('story_name', storyName)
  .select()
  .first()
}

module.exports = {
  getStoryByName
}
