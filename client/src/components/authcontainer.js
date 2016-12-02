import React, { Component } from 'react';
import {Row,Col} from 'react-materialize';
import {connect} from 'react-redux';
import Login from './login';
import Register from './register';
class AuthContainer extends Component {
	
  render() {
    return (
      <Row id="loginRegisterModal">
		<Col l={6} m={6} s={12}>
			<Login/>
		</Col>
		<Col l={6} m={6} s={12}>
			<Register/>
		</Col>
	  </Row>
    );
  }
}

export default AuthContainer;