const mongoose = require('mongoose')
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

const activity = [
  'Exercised for 25 minutes',
  'Ate spaghetti',
  'Slept with diffuser last night',
  'Ate corn on the cob',
  'Woke up with a headache',
  'Bike ride for 5 miles',
  'Sneezed',
  'Ate a tums',
  'Mopped the kitchen',
  'Brushed teeth',
]
const activityType = ['food', 'exercise', 'mood', 'body function', 'chore']
const dates = ['09/18/2023', '09/17/2023']

const seedDB = async () => {
  for (let i = 0; i < activity.length; i++) {
    randomActivityType =
      activityType[Math.floor(Math.random() * activityType.length)]
    randomDate = dates[Math.floor(Math.random() * dates.length)]
    // console.log(
    //   `activityDetails: ${randomDate} ${randomActivityType} ${activity[i]}`
    // )
    const randActivity = new Activity({
      activityType: randomActivityType,
      activity: activity[i],
      date: randomDate,
    })
    await randActivity.save()
  }
}

// console.log(randomActivities)
seedDB().then(() => {
  mongoose.connection.close()
})
