import React, { Component } from 'react';
import {Row,Col,Card} from 'react-materialize';
import {connect} from 'react-redux';
import Login from './login';
import Register from './register';
class AuthContainer extends Component {
  renderError(error){
	  if(error && error.trim().length>0){
		  return <Row>
					<Col className="offset-l3 offset-m3" l={6} m={6} s={12}>
						<Card className='orange darken-1' key="1" title='Error'>
							<p>{this.props.error}</p>
						</Card>
						
					  </Col>
				</Row>
	  }else{
		  return <div/>
	  }
  }
  renderConfirm(confirmMsg){
	  if(confirmMsg && confirmMsg.trim().length>0){
		  return <Row>
					<Col className="offset-l3 offset-m3" l={6} m={6} s={12}>
						<Card className='green lighten-1' key="1" title='Confirmation'>
							<p>{this.props.confirmMsg}</p>
						</Card>
						
					  </Col>
				</Row>
	  }else{
		  return <div/>
	  }
  }
  render() {
    return (
	<Row>
	  {this.renderError(this.props.error)}
	  {this.renderConfirm(this.props.confirmMsg)}
	  <Col className="l10 m10 offset-l1 offset-m1 offset-s1 s10">
		  <Row id="loginRegisterModal">
			<Col l={6} m={6} s={12}>
				<Login/>
			</Col>
			<Col l={6} m={6} s={12}>
				<Register/>
			</Col>
		  </Row>
		  <Row>
			<Col className="offset-l3 offset-m3" l={6} m={6} s={12}>
				<Card className='green lighten-1' key="1" title='Dont want to register?'>
					<p>Use these credentials to login to demo account</p>
					<p>Username: demo@demo.com</p>
					<p>Password: demo</p>
				</Card>
				
			  </Col>
		  </Row>
		 </Col>
	</Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let errorMsg='';
  let confirmMsg='';
  if(state.loginReducer.error){
	  errorMsg=state.loginReducer.error;
  }
  if(state.registrationReducer.error){
	  errorMsg=state.registrationReducer.error;
  }
  if(state.registrationReducer.message){
	  confirmMsg=state.registrationReducer.message;
  }
  return {error:errorMsg,confirmMsg:confirmMsg}
}

const Container = connect(mapStateToProps)(AuthContainer);
export default Container;