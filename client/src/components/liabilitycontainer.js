import React, { Component } from 'react';
import {Row} from 'react-materialize';
import {connect} from 'react-redux';
import Liability from './liability';

class LiabilityContainer extends Component {
	
  render() {
    return (
      <div id="liabilities" className="card card-content white-text purple lighten-3">
		<Row className="center-align">
			<span className="card-title center-align">Loans</span>
		</Row>
		{this.props.liabilities.map((liability,index)=>{
			return <Liability key={index} id={index} liability={liability} onChange={this.props.onChange} onRemove={this.props.onRemove} onSave={this.props.onSave}/>
		})}	
	  </div>
    );
  }
}

export default LiabilityContainer;