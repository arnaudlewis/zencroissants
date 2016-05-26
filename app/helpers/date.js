const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export let CustomDate = {

  now () {
    return new Date()
  },

  increment(date, inc, type) {
    let newDate = date
    switch(type) {
      case DateTypes.DAY:
        newDate.setDate(date.getDate() + inc * DAY)
        return newDate

      case DateTypes.HOUR:
        newDate.setDate(date.getDate() + inc * HOUR)
        return newDate

      case DateTypes.MINUTE:
        newDate.setDate(date.getDate() + inc * MINUTE)
        return newDate

      case DateTypes.SECOND:
        newDate.setDate(date.getDate() + inc * SECOND)
        return newDate

      default:
        return newDate
    }
  }
}

export let DateTypes = {
  DAY: 'day',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second'
}
