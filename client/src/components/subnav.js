import React, { Component } from 'react';
import {Row,Col} from 'react-materialize';

class Subnav extends Component { 
  generateNav(user){
	  if(user && user.email){
		  return <Row> 
				<Col l={3} m={3} s={6} className="offset-l4 offset-m4">
					<a href="#" className="waves-effect waves-light btn-large purple darken-3">
						   <i className="material-icons left">fast_rewind</i> Previous Month
					</a>
				</Col>
				<Col l={3} m={3} s={6}>
					<a href="#" className="waves-effect waves-light btn-large purple darken-3">
						   <i className="material-icons left">fast_forward</i> Next Month
					</a>
				</Col>
				</Row>
	  }else{
		  return <Col l={2} m={2} s={6} className="offset-l5 offset-m5">
					<a href="#/login" className="waves-effect waves-light btn-large purple darken-3">
						   <i className="material-icons left">work</i> Save
					</a>
				</Col>
	  }
  } 
  render() {
    return (
	<Row>
		{this.generateNav(this.props.user)}
	</Row>
    );
  }
}

export default Subnav;