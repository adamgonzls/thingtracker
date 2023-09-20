const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActivitySchema = new Schema({
  activityType: {
    enum: ['food', 'exercise', 'mood', 'body function', 'chore'],
    type: String,
  },
  activity: String,
  date: String,
})

module.exports = mongoose.model('Activity', ActivitySchema)
