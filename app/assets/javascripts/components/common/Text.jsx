import React from 'react'
import ReactDOM from 'react-dom'

export let Text = React.createClass({

  propTypes: {
    maxLength: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    defaultValue: React.PropTypes.string,
    onKeyDown: React.PropTypes.func
  },

  onBlur(event) {
    let value = event.target.value
    let cleanedValue = value.trim().length > 0 ? value : null
    this.props.onBlur(cleanedValue)
  },

  empty() {
    this.refs.input.value = ''
  },

  render() {
    return (
      <input
        ref="input"
        defaultValue={this.props.defaultValue}
        type="text"
        placeholder={this.props.placeholder}
        maxLength={this.props.maxLength}
        onBlur={this.onBlur}
        onKeyDown={this.props.onKeyDown} />
    )
  }
})
