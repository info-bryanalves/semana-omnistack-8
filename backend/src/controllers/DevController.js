const Dev = require('../model/Dev')
const axios = require('axios')

module.exports = {
  async index(req, res) {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    const devs = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ]
    })

    return res.json(devs)
  },

  async store(req, res) {
    const { username } = req.body

    const userExists = await Dev.findOne({ username })

    if (userExists) {
      return res.json(userExists)
    }

    const response = await axios.get(`https://api.github.com/users/${username}`)

    if (response.data) {
      const { name, bio, avatar_url: avatar } = response.data

      const dev = await Dev.create({
        name,
        username,
        bio,
        avatar
      })

      if (dev) {
        return res.json(dev)
      }
    }

    return res.status(400).json({ "deu": "ruim" })
  }
}