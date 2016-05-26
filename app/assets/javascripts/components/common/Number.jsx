import React from 'react'
import ReactDOM from 'react-dom'
import NumberInput from 'react-number-input'

function initialState() {
  return {
    value: null
  }
}
export let Number = React.createClass({

  propTypes: {
    placeholder: React.PropTypes.string,
    format: React.PropTypes.string,
    defaultValue: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    min: React.PropTypes.number
  },

  getInitialState: initialState,

  onChange(event) {
    const value = parseFloat(event.target.value)
    this.setState({value: value})
    this.props.onChange(value)
  },

  render() {
    if(this.props.min) {
      return <NumberInput
        onChange={this.onChange}
        value={this.state.value}
        format={this.props.format || '0,0'}
        placeholder={this.props.placeholder || '0'}
        min={this.props.min} />
    } else {
      return <NumberInput
        onChange={this.onChange}
        value={this.state.value}
        format={this.props.format || '0,0'}
        placeholder={this.props.placeholder || '0'} />
    }
  }
})

