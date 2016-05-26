import { Global } from '../global'
import * as BCrypt from 'bcrypt-nodejs'
import moment from 'moment'
import JWT from 'jsonwebtoken'
import R from 'ramda'
import {CustomDate, DateTypes} from '../helpers'

export let User = class {

  constructor (id, email, password, firstname, lastname, booked) {
    this._id = id
    this.email = email
    this.password = password
    this.firstname = firstname
    this.lastname = lastname
    this.booked = booked || []
  }

  setId(newId) {
    this._id = newId
  }

  validPassword (password) {
    return new Promise((resolve, reject) => {
      BCrypt.compare(password, this.password, function(err, res) {
        if(err) reject()
        else resolve(res)
      })
    })
  }

  bookTrip (trip) {
    this.booked.push(trip)
  }

  toJson () {
    return {
      "_id": this._id,
      "email": this.email,
      "password": this.password,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "booked": this.booked
    }
  }

  asPublicCtx () {
    return {
      "_id": this._id,
      "email": this.email,
      "firstname": this.firstname,
      "lastname": this.lastname
    }
  }
}

export let UserCompanion = {
  hashPassword (password) {
    return new Promise((resolve, reject) => {
      BCrypt.genSalt(Global.BCryptSaltRounds, (err, salt) => {
        BCrypt.hash(password, salt, null, (err, hash) => {
          if(err) reject()
          resolve(hash)
        })
      })
    })
  },

  crypt(user) {
    const ctx = R.merge(user.asPublicCtx(), {expiredAt: this.expirationTime()})
    return JWT.sign(ctx, Global.JWTPassphrase)
  },

  expirationTime() {
    return moment.duration(Global.TokenExpiration, 'days');
  },

  decrypt(token) {
    return JWT.verify(token, Global.JWTPassphrase);
  }
}
