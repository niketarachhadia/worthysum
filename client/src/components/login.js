import React, { Component } from 'react';
import { Row, Card,  Col,Button ,Icon } from 'react-materialize';
import {connect} from 'react-redux';
import {loginApi} from '../redux/loginactions';
import {push} from 'react-router-redux';

class Login extends Component {
  constructor(props) {
    super(props);
	this.state = {user: {
			email:'',
			password:''
		}
	};
  }
  
  handleChange(event) {
	
	let updatedLogin=this.state.user;
	updatedLogin[event.target.id]= event.target.value;
    this.setState({user:updatedLogin});
  }
  handleRegister(event) {
	event.preventDefault();
	this.props.dispatch(push('/register'))
  }
  login(event) {
	  event.preventDefault();
	  const promise=this.props.dispatch(
            loginApi(this.state.user)
        );
	  promise.then(function(data){
			if(data.type==="LOGIN_SUCCESS"){
				this.props.dispatch(push('/home'))
			}
			
		}.bind(this));
  }
  render() {
    return (
	<div className="l12 m12 s12 card card-content white-text purple darken-2 center-align">
		<p className="center-align">Login</p>
      <Row l={12} m={12} s={12}>

		<div className="col center-align s12 m6 l6 offset-l3 offset-m3">
			
				
				<input type="email"
				  placeholder="Email Address"
				  id="email"
				  className="validate" required="" aria-required="true"
				  value={this.state.user.email}
				  onChange={this.handleChange.bind(this)} 
				  />
				<input type="password"
				  placeholder="password"
				  id="password"
				  value={this.state.user.password}
				  onChange={this.handleChange.bind(this)} 
				  />
				
			
			
		</div>
		
	</Row>
	<Row>
		<div className="col card-action center-align s12 m12 l12">
			<a href="#" className="waves-effect waves-light btn purple lighten-3 " onClick={this.login.bind(this)}>Login</a>
		</div>
	</Row>
	</div>
    );
  }
}
var Container = connect()(Login);
export default Container;