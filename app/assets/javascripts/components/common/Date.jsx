import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

function initialState() {
  return {
    date: Moment()
  }
}

export let Date = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    fromNow: React.PropTypes.bool
  },

  componentWillMount() {
    this.setState({date: this.props.defaultValue || Moment()})
  },

  componentDidMount() {
    this.handleChange(this.state.date)
  },

  handleChange(date) {
    this.setState({date: date})
    this.props.onChange(date)
  },

  render: function() {
    if(this.props.fromNow) {
      return <DatePicker
        selected={this.state.date}
        onChange={this.handleChange} />
    } else {
      return <DatePicker
        selected={this.state.date}
        onChange={this.handleChange}
        minDate={Moment()} />
    }
  }
})
