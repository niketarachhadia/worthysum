import React, { Component } from 'react';
import { Row, Card,  Col } from 'react-materialize';
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
			}else{
				this.props.dispatch(push('/loginerror'))
			}
			
		}.bind(this));
	  console.log('Call login action here');
  }
  render() {
    return (
	<div className="l12 m12 s12 card card-content white-text purple darken-2 center-align">
		<p className="center-align">Login</p>
      <Row l={12} m={12} s={12}>
		<Col className="offset-l3 offset-m3">
			<div>
				
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
			
		</Col>
		
	</Row>
	<Row>
		<Col l={2} m={2} s={6} className="offset-l3 offset-m3">
			<a href="#" className="waves-effect waves-light btn purple lighten-3" onClick={this.login.bind(this)}>
					   <i className="material-icons left">vpn_key</i>Login
			</a>
		</Col>
	</Row>
	</div>
    );
  }
}
var Container = connect()(Login);
export default Container;