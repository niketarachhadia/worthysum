import React, { Component } from 'react';
import {Row,Col,Card} from 'react-materialize';

class Stats extends Component { 
numFormatter(num,n, x) {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return num.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

	
  render() {
	let pieData = [
	  {label: 'Margarita', value: 20.0},
	  {label: 'John', value: 55.0},
	  {label: 'Tim', value: 25.0 }]
    return (
		<Row>
			<Col className="white-text purple darken-2 center-align s6 m4 l4 offset-s3">
				<p className="center-align"><i className="material-icons">trending_up</i>Current Net Worth</p>
				<h4 className="center-align">${this.numFormatter(this.props.networth.net)}</h4>
			</Col>
			<Col className="white-text purple darken-2 center-align s6 m4 l4 offset-s3">
				<p className="center-align"><i className="material-icons">trending_up</i>Total Debt</p>
				<h4 className="center-align">${this.numFormatter(this.props.networth.totalDebt)}</h4>
			</Col>
			<Col className="white-text purple darken-2 center-align s6 m4 l4 offset-s3">
				<p className="center-align"><i className="material-icons">trending_up</i>Total Assets</p>
				<h4 className="center-align">${this.numFormatter(this.props.networth.totalAssets)}</h4>
			</Col>
		</Row>
    );
  }
}

export default Stats;