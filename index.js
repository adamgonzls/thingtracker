const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const path = require('path')
const engine = require('ejs-mate')
const Activity = require('./models/activity')
const methodOverride = require('method-override')
const { activityTypes } = require('./variables')

mongoose
  .connect('mongodb://localhost:27017/thingTracker')
  .then(() => {
    console.log('mongo connection open')
  })
  .catch((err) => {
    console.log('oh no mongo error')
    console.log(err)
  })

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

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
      // console.log(acc)
      return acc
    }, {})
  }
  const groupedActivities = groupBy(activities, 'date')
  // console.log(groupedActivities)
  res.render('activities/index', { groupedActivities })
})

app.get('/activities/new', (req, res) => {
  res.render('activities/new', { activityTypes })
})

app.get('/activities/:id', async (req, res) => {
  const { id } = req.params
  const activity = await Activity.findById(id)
  res.render('activities/details', { activity })
})

app.get('/activities/:id/edit', async (req, res) => {
  const activity = await Activity.findById(req.params.id)
  res.render('activities/edit', { activity, activityTypes })
})

app.put('/activities/:id', async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, {
    ...req.body,
  })
  res.redirect(`/activities/${activity._id}`)
})

app.post('/activities', async (req, res) => {
  const newActivity = new Activity(req.body)
  await newActivity.save()
  res.redirect(`/activities/${newActivity._id}`)
})

app.delete('/activities/:id', async (req, res) => {
  console.log(req.params.id)
  await Activity.findByIdAndDelete(req.params.id)
  res.redirect('/activities')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
