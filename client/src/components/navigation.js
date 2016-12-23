import React, { Component } from 'react';
import {Row,Col} from 'react-materialize';
import cookie from 'react-cookie';
import {logoutApi} from '../redux/loginactions';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import $ from "jquery";
import AuthContainer from './authcontainer'
  
class Navigation extends Component {
  personalize(email,firstname,lastname){
	  if(email){
		  return <li><a href="#/"><i className="material-icons left">perm_identity</i> {firstname} {lastname}</a></li>
	  }else{
		  return <li><a href="#/"><i className="material-icons left">perm_identity</i>Unknown User</a></li>
	  }
  }
  loginOrLogout(email){
	  if(email){
		  return <li><a href="#" onClick={this.logOut.bind(this)}>Logout</a></li>
	  }else{
		  return <li><a href="#/login">Login/Register</a></li>
	  }
  }
  logOut(event) {
	  event.preventDefault();
	  const retVal=this.props.dispatch(
            logoutApi()
        );
	  if(retVal.type="LOGOUT"){
		  this.props.dispatch(push('/intro'))
	  }
	  
  }
  render() {
    return (
      <div className="row navbar-fixed">
		<nav className="purple lighten-3 col l10 m10 offset-l1 offset-m1 offset-s1 s10">
		  <div className="nav-wrapper">
					<a href="#/" className="brand-logo">
						<img className="responsive-img"  src={'./wslogo.png'} alt="Logo" />
					</a>
					<ul className="right hide-on-med-and-down">
						{this.personalize(this.props.user.email,this.props.user.firstname,this.props.user.lastname)}
						{this.loginOrLogout(this.props.user.email)}
					</ul>
		  </div>
		</nav>
	  </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {user:state.loginReducer}
}
var Container = connect(mapStateToProps)(Navigation);
export default Container;