import React, { Component } from 'react';
import { Row, Card,  Col } from 'react-materialize';
import {connect} from 'react-redux';
import {registerApi} from '../redux/registeractions';
import {push} from 'react-router-redux';

class Register extends Component {
  constructor(props) {
    super(props);
	this.state = {user: {
			email:'',
			password:'',
			confirmPassword:'',
			firstname:'',
			lastname:''
		}
	};
  }
  
  
  handleChange(event) {
	
	let updatedUser=this.state.user;
	updatedUser[event.target.id]= event.target.value;
    this.setState({user:updatedUser});
  }
  
  register(event) {
	event.preventDefault();
	  const promise=this.props.dispatch(
            registerApi(this.state.user)
        );
	  promise.then(function(data){
			if(data.type==="REGISTER_SUCCESS"){
				this.props.dispatch(push('/login'))
			}else{
				this.props.dispatch(push('/loginerror'))
			}
			
		}.bind(this));
  }
  
  render() {
    return (
	<div id="register" className="l12 m12 s12 card card-content white-text purple darken-2 center-align">
		<p className="center-align">Register</p>
      <Row>
		<Col l={6} m={6} s={12} className="offset-l3 offset-m3">
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
				<input type="password"
				  placeholder="Confirm Password"
				  id="confirmPassword"
				  value={this.state.user.confirmPassword}
				  onChange={this.handleChange.bind(this)} 
				  />
				<input type="text"
				  placeholder="First Name"
				  id="firstname"
				  value={this.state.user.firstname}
				  onChange={this.handleChange.bind(this)} 
				  />
				<input type="text"
				  placeholder="Last Name"
				  id="lastname"
				  value={this.state.user.lastname}
				  onChange={this.handleChange.bind(this)} 
				  />
				
			</div>
			
		</Col>
		
	</Row>
	<Row>
		<Col l={2} m={2} s={6} className="offset-l3 offset-m3">
			<a href="#" className="waves-effect waves-light btn purple lighten-3" onClick={this.register.bind(this)}>Submit</a>
		</Col>
	</Row>
	</div>
    );
  }
}
var Container = connect()(Register);
export default Container;