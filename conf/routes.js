import express from 'express'
const router = express.Router()
import R from 'ramda'
import { Router } from '../app/Router'
import Authentication from '../app/security/Authentication'
import WebsiteController from '../app/controllers/Website'
import TripController from '../app/controllers/Trip'
import { AppConfig } from './appconfig'
import { UserCompanion } from '../app/models/User'


router.use((req, res, next) => {
  const token = req.cookies['X-token']
  if(!token) {
    req.ctx = null
    next()
  } else {
    const userWithExpiration = UserCompanion.decrypt(token)
    const expirationTime = new Date(userWithExpiration.expiredAt).getTime()
    if(expirationTime < new Date().getTime()) {
      res.clearCookie('X-token')
      req.ctx = null
      next()
    } else {
      const u = R.omit(['expiredAt'], userWithExpiration)
      req.ctx = u
      req.app.locals.ctx = u
      next()
    }
  }
});

//Website
router.get(Router.index, WebsiteController.index)
router.get(Router.authenticate, WebsiteController.authenticate)
router.get(Router.profile, WebsiteController.profile)

//Trips
router.get(Router.tripview, TripController.tripview)
router.post(Router.travel, TripController.tripinsert)
router.get(Router.triplist, TripController.getAllTrip)
router.get(Router.trip, TripController.getOneTrip)
router.get(Router.bookTrip, TripController.bookTrip)


// Security
router.post(Router.signin, Authentication.signin)
router.post(Router.signup, Authentication.signup)
router.get(Router.logout, Authentication.logout)

export default router
