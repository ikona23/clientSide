import React, { Component } from 'react'

class TestForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      userNumber: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleUsrNum = this.handleUsrNum.bind(this)
    this.Caller = this.Calller.bind(this)
  }

  handleName (e) {
    // grabs the name as written so far using onChange
    this.setState({userName: e.target.value})
    console.log('logged username', this.state.userName)
  }

  handleUsrNum (e) {
    // grabs the phone number as written so far using onChange
    this.setState({userNumber: e.target.value})
    console.log('logged userNumber', this.state.userNumber)
  }

  handleSubmit (e) {
  let userName = this.state.userName
  let userNumber = this.state.userNumber
  e.preventDefault()
  this.props.Caller(userName, userNumber)
  }

  Caller (userName, userNumber) {
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" id="user-name" onChange={this.handleName} placeholder="Name" />
        <input type="text" id="user-phone" onChange={this.handleUsrNum} placeholder="Phone Number" />
        <button type="submit" >Submit</button>
      </form>
    )
  }
}

export default TestForm
