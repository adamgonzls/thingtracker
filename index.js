const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const path = require('path')
const Activity = require('./models/activity')

mongoose
  .connect('mongodb://localhost:27017/thingTracker')
  .then(() => {
    console.log('mongo connection open')
  })
  .catch((err) => {
    console.log('oh no mongo error')
    console.log(err)
  })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/activities', async (req, res) => {
  const activities = await Activity.find()
  // console.log(activities)
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      // Add object to list for given key's value
      acc[key].push(obj)
      return acc
    }, {})
  }
  const groupedActivities = groupBy(activities, 'date')
  console.log(groupedActivities)
  res.render('activities/index', { groupedActivities })
})

app.get('/activities/:id', async (req, res) => {
  const { id } = req.params
  const activity = await Activity.findById(id)
  res.render('activities/details', { activity })
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
