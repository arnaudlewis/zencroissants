const BASE_URI = () => window.endpoint

const transitionTo = (url) => location.href = url

export let Locator = {

  index () {
    transitionTo(Router.index)
  },

  authenticate () {
    transitionTo(Router.authenticate)
  },

  tripList () {
    transitionTo(Router.triplist)
  }
}
