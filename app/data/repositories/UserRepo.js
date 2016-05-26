import { getCollection } from '../db'
import mongojs from 'mongojs'
import { User } from '../../models/User'

const collection = getCollection('users')

const buildUser = (mongoUser) => {
  if(!mongoUser) return null
  return new User (
    mongoUser._id,
    mongoUser.email,
    mongoUser.password,
    mongoUser.firstname,
    mongoUser.lastname,
    mongoUser.booked
  )
}

export default {

  checkEmailAvailable (email) {
    return new Promise((resolve, reject) => {
      const query = { "email": email }
      collection.findOne(query, (err, user) => {
        if(err) reject("Unable to check email")
        if(user) reject("email already taken")
        else resolve()
      })
    })
  },

  byCredentials (identifier) {
    return new Promise((resolve, reject) => {
      const query = { "email": identifier }
      collection.findOne(query, (err, user) => {
        if(err) reject(err)
        resolve(buildUser(user))
      })
    })
  },

  insert(user) {
    return new Promise((resolve, reject) => {
      collection.insert(user.toJson(), (err, res) => {
        if(err) reject(err.message)
        else {
          resolve(res)
        }
      })
    })
  },

  bookTrip(userId, trip) {
    return new Promise((resolve, reject) => {
      const selector = { _id : mongojs.ObjectId(userId)}
      const modifier = { "$push" : { booked : trip}}
      collection.update(selector, modifier, (err, res) => {
        if(err) reject(err.message)
        else resolve()
      })
    })
  },

  getBooked(userId) {
    console.log(userId)
    return new Promise((resolve, reject) => {
      const query = { _id: mongojs.ObjectId(userId) }
      collection.findOne(query, (err, user) => {
        if(err) reject(err)
        else resolve(buildUser(user).booked)
      })
    })
  },

  getBookedTrip(userId, tripId) {
    return new Promise((resolve, reject) => {
      const query = { _id: mongojs.ObjectId(userId), "booked._id": mongojs.ObjectId(tripId)}
      console.log(query)
      collection.findOne(query, (err, user) => {
        if(err) {
          console.log(err)
          reject(err)
        }
        else resolve(buildUser(user))
      })
    })
  }
}
