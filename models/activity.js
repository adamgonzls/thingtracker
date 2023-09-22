const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { activityTypes } = require('../variables')

const ActivitySchema = new Schema({
  activityType: {
    enum: activityTypes,
    type: String,
  },
  activity: String,
  date: String,
})

module.exports = mongoose.model('Activity', ActivitySchema)
