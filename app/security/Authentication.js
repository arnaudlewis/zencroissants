import { Router } from '../Router'
import UserRepo from '../data/repositories/UserRepo'
import { User, UserCompanion } from '../models/User'

export default {

  signin(req, res) {
    let email = req.body.email
    let password = req.body.password

    const errorUrl = (message) => {
      return Router.withQueryString(
        Router.authenticate,
        {
          signin_error: message,
          "signin_email": email
        }
      )
    }

    if(!(email && password)) res.redirect(errorUrl("You must provide all informations to signin"))

    UserRepo.byCredentials(email)
      .then((user) => {
        user.validPassword(password)
          .then((isValid) => {
            if(isValid) {
              const redirectURL = req.headers.referer
              res.cookie('X-token', UserCompanion.crypt(user), { maxAge: UserCompanion.expirationTime(), httpOnly: false});
              res.redirect(redirectURL)
            } else res.redirect(errorUrl("Invalid password"))
          })
          .catch(() => {
            res.redirect(errorUrl("Cannot authenticate"))
          })
      })
    .catch((errMessage) => {
      res.redirect(errorUrl(errMessage))
    })
  },

  signup(req, res) {
    let email = req.body.email
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname

    const errorUrl = (message) => {
      return Router.withQueryString(
        Router.authenticate,
        {
          signup_error: message,
          "signup_email": email,
          "signup_firstname": firstname,
          "signup_lastname": lastname
        }
      )
    }

    if(!(email && password && firstname && lastname)) res.redirect(errorUrl("You must provide all informations to signup"))

    UserRepo.checkEmailAvailable((email))
      .then(() => {
        UserCompanion.hashPassword(password)
          .then((hash) => {
            let u = new User(null, email, hash, firstname, lastname)
            UserRepo.insert(u)
            .then((inserted) => {
              const redirectURL = req.headers.referer
              u.setId(inserted._id)
              res.cookie('X-token', UserCompanion.crypt(u), { maxAge: UserCompanion.expirationTime(), httpOnly: false});
              res.redirect(redirectURL)
            })
            .catch((errMessage) => {
              res.redirect(errorUrl(errMessage))
            })
          })
          .catch(() => {
            res.redirect(errorUrl("Unable to create user"))
          })
      })
      .catch((errMessage) => {
        res.redirect(errorUrl(errMessage))
      })
  },

  logout(req, res) {
    req.app.locals.ctx = null
    res.clearCookie('X-token')
    res.redirect(Router.index)
  }
}
