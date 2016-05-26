'use strict';


export let Trip = class {

  constructor (id, departure, arrival, date, nPlace, driver, price) {
    this._id = id
    this.departure = departure
    this.arrival = arrival
    this.date = date
    this.nPlace = nPlace
    this.driver = driver
    this.price = price
  }

  toJson () {
    return {
      "_id": this._id,
      "departure": this.departure,
      "arrival": this.arrival,
      "date": this.date,
      "nPlace": this.nPlace,
      "driver": this.driver,
      "price": this.price
    }
  }
}
