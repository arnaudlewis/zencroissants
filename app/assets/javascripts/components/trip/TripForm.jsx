import React from 'react'
import ReactDOM from 'react-dom'
import R from 'ramda'

import { Communication } from '../../modules/Communication'
import { Locator } from '../../modules/Locator'

import { Text } from '../common/Text.jsx'
import { Number } from '../common/Number.jsx'
import { Date } from '../common/Date.jsx'

function initialState () {
  return {
    errors: [],
    form: {}
  }
}

export let TripForm = React.createClass({

  propTypes: {
    trip: React.PropTypes.object
  },

  getInitialState: initialState,

  update(key, value) {
    const form = this.state.form
    let data = {}
    data[key] = value
    const updated = R.merge(form, data)
    this.setState({form: updated})
  },

  onSubmit(event) {
    event.preventDefault()

    const _form = this.state.form
    console.log(_form)
    if(!(_form.departure, _form.arrival, _form.date, _form.nPlace, _form.price)) this.setState({errors: ["You must fill the form !"]})
    else {
      Communication.createTrip(_form)
        .then(() => {
          Locator.tripList()
        })
        .catch((error) => {
          this.setState({errors: [error.message]})
        })
    }
  },

  render() {
    return (
      <form method="POST" action="/" onSubmit={this.onSubmit}>
        <Text placeholder="departure" maxLength="50" onBlur={this.update.bind(null, "departure")}/>
        <Text placeholder="arrival" maxLength="50" onBlur={this.update.bind(null, "arrival")}/>
        <Date name="date" onChange={this.update.bind(null, "date")}/>
        <Number onChange={this.update.bind(null, "nPlace")} min={1} format='0'placeholder='Min. 1'/>
        <Number onChange={this.update.bind(null, "price")} min={0} format='0,00'placeholder='Price'/>

        <div class="feedback">{this.state.errors.reduce((acc, current) => {return acc + '\n' + current}, '')}</div>
        <input type="submit" value={this.props.trip ? 'Update' : 'Create'} />
      </form>
    )
  }
})
