import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../_actions'

class HomeContainer extends Component {

  handleAdmin() {
    const {login} = this.props
    login('admin', '11111111')
  }

  render() {
    return (
      <div onClick={this.handleAdmin.bind(this)}>shang</div>
    )
  }
}

// connect redux
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login: userActions.login
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
