import React from 'react'
import ReactDOM from 'react-dom'

import { Communication } from '../../modules/Communication'

function initialState() {
  return {
    booked: false,
    error: ''
  }
}

export let BookButton = React.createClass({

  props: {
    tripId: React.PropTypes.string.isRequired,
    booked: React.PropTypes.bool
  },

  getInitialState: initialState,

  componentWillMount() {
    console.log(this.props.booked)
    this.setState({booked: this.props.booked === 'true' ? true : false})
  },

  onSubmit(e) {
    e.preventDefault()
    if(this.state.booked) return
    Communication.bookTrip(this.props.tripId)
      .then(() => {
        this.setState({booked: true, error: ''})
      })
      .catch((err) => {
        this.setState({error: err.message})
      })
  },

  render() {
    if(this.state.booked) return (<div><input readOnly="true" className="disabled" type="submit" onClick={this.onSubmit} value="Booked !" /></div>)
    else return (<div><input type="submit" onClick={this.onSubmit} value="Book" /><span className="error">{this.state.error}</span></div>)
  }
})
