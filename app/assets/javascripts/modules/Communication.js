import 'whatwg-fetch'
import R from 'ramda'

const Method = { GET: 'GET', POST: 'POST' }
const ContentType = { JSON: 'application/json' }

async function checkStatus(response) {
  console.log(response)
  if (response.ok) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    error.status = response.status
    error.message = await response.text()
    throw error
  }
}

function parseJSON(response) {
  return new Promise((resolve, reject) => {
    response.json()
      .then((res) => {
        if(res) resolve(res)
        else resolve()
      })
      .catch(() => {
        resolve()
      })
  })
}

function buildQSUrl(url, params) {
  let queryString = '';
  if ( params ) {
    let buildQueryString = (query, key) => [query, key, '=', params[key],'&'].join('');
    queryString = R.reduce(buildQueryString, '?', R.keys(params)).slice(0,-1);
  }
  return url + queryString;
}

function asyncRequest(method, url, params, contentType) {
  let myHeaders = new Headers();
  if(contentType) myHeaders.append("Content-Type", contentType);

  const absoluteUrl = url
  const options = {
    method: Method.GET,
    credentials: 'include',
    headers: myHeaders
  }

  let p;
  switch (method) {
    case Method.GET :
      p = fetch(absoluteUrl, options)
      break;

    case Method.POST :
      let postOptions = R.merge(options, {method: Method.POST, body: JSON.stringify(params)})
      p = fetch(absoluteUrl, postOptions)
      break;
  }
  return p.then(checkStatus).then(parseJSON)
}

export let Communication = {
  createTrip(tripData) {
    return asyncRequest(Method.POST, Router.travel, tripData, ContentType.JSON)
  },

  bookTrip(tripId) {
    let route = Router.bookTrip.replace(':tripId', tripId)
    return asyncRequest(Method.GET, route, null)
  }
}
