import request from 'superagent'

const rootUrl = '/api/v1/madlibs'

export function getStoryByName (storyName) {
  return request.get(rootUrl + '/' + storyName)
    .then(res => {
      return res.body
    })
    .catch(err => console.log(err))
}
