import { Router } from '../Router'
import UserRepo from '../data/repositories/UserRepo'
import TripRepo from '../data/repositories/TripRepo'
import { User } from '../models/User'
import { Trip } from '../models/Trip'


export default {

  index(req,res){
    res.render('index')
  },

  authenticate(req, res) {
    if(req.ctx) res.redirect(Router.index)
    else {
      res.render(
        'authenticate',
        {
          signup_email: req.query.signup_email,
          signup_firstname: req.query.signup_firstname,
          signup_lastname: req.query.signup_lastname,
          signin_email: req.query.signin_email,
          signin_error: req.query.signin_error,
          signup_error: req.query.signup_error
        }
      )
    }
  },

  profile(req, res) {
    if(!req.ctx) res.redirect(Router.authenticate)
    else {
      console.log(req.ctx)
      const futureProposed = TripRepo.getAllByUserId(req.ctx._id)
      const futureBooked = UserRepo.getBooked(req.ctx._id)
      Promise.all([futureProposed, futureBooked])
        .then((resolved) => {
          res.render('profile', {ctx: req.ctx, booked: resolved[1], proposed: resolved[0]})
        })
        .catch((errMessage) => {
          res.status(500)
        })
    }
  }
}
