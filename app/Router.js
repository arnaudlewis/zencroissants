import R from 'ramda'

export let Router = {
  //website
  index: '/',
  authenticate: '/authenticate',
  profile: '/profile',

  //security
  signin: '/signin',
  signup: '/signup',
  logout: '/logout',

  //helpers
  'contact': '/contact',
  'travel':'/travel',
  'triplist':'/trips',
  'tripview':'/trip',
  'trip': '/trips/:tripId',
  "bookTrip": '/user/book/trip/:tripId',

  withQueryString(route, params) {
    let queryString = '';
    if ( params ) {
      const buildQueryString = (query, key) => [query, key, '=', params[key],'&'].join('');
      queryString = R.reduce(buildQueryString, '?', R.keys(params)).slice(0,-1);
    }
    return route + queryString;
  }
}
