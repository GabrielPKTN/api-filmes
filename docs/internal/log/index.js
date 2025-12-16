const getExplore = require('./getExplore.js')
const getFollowing = require('./getFollowing.js')
const post = require('./post.js')
const put = require('./put.js')
const deleteLog = require('./delete.js')

module.exports = {
    "/v1/travellog/log/": {
        ...post
    },

    "/v1/travellog/explore/log/": {
        ...getExplore
    },

    "/v1/travellog/following/log/":{
        ...getFollowing
    },

    "/v1/travellog/log/{id}": {
        ...put,
        ...deleteLog
    }
}