import request from 'superagent'

const rootUrl = '/api/v1/madlibs'

export function getStoryByName (storyName) {
  console.log("api request", storyName)
  return request.get(rootUrl + '/' + storyName)
    .then(res => {
      return res.body[0].story_text
    })
    .catch(err => console.log(err))
}
