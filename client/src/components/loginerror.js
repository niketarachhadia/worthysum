import React, { Component } from 'react';
import { Row, Card,  Col } from 'react-materialize';
import {connect} from 'react-redux';

class LoginError extends Component {
  
  render() {
    return (
		  <Row>
			  <Col className="offset-l3 offset-m3" l={6} m={6} s={12}>
				<Card className='light-blue darken-1' textClassName='red' key="1" title='Error'>
					<p>{this.props.error}</p>
				</Card>
				
			  </Col>
			</Row>
		
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {error:state.loginReducer.error}
}

const Container = connect(mapStateToProps)(LoginError);
export default Container;