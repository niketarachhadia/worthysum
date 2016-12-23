import React, { Component } from 'react';
import {Row,Input,Col} from 'react-materialize';

const types=['Home Mortgage','Student Loan','Car Loan','Personal Loan','Home Equity', 'Stock Margin', 'Pending Tax','Unpaid Bills','Other Loans'];

class Liability extends Component {  
  render() {
	console.log("DEBUG props: "+JSON.stringify(this.props.liability));
    return (
	<Row className="purple darken-2 valign-wrapper">
      
		<Col s={3} l={3} m={3}>
				<Input s={12} m={12} l={12} type='select' value={this.props.liability.type} onChange={this.props.onSave.bind(null,this.props.id)} 
				id={'debttype-'+this.props.id}
				>
					<option value={''}>Loan Type</option>
					{types.map((type)=>{
						return <option value={type}>{type}</option>
					})}
				  </Input>
		</Col>
		<Col s={3} l={3} m={3}>
			<Input type="text"
			  label="Description"
			  id={'debtdescription-'+this.props.id}
			  value={this.props.liability.description}
			  onChange={this.props.onChange.bind(null,this.props.id)}
			  onBlur={this.props.onSave.bind(null,this.props.id)}
			  onKeyDown={this.props.onSave.bind(null,this.props.id)}			  
			  className="valign"
			  />
		</Col>			
		<Col s={4} l={4} m={4}>
			 <Input type="number" 
			  label="Remaining Amount"
			  id={'debtremaining_amount-'+this.props.id}
			  value={this.props.liability.remaining_amount}
			  onChange={this.props.onChange.bind(null,this.props.id)} 
			  onBlur={this.props.onSave.bind(null,this.props.id)}
			  onKeyDown={this.props.onSave.bind(null,this.props.id)}
				className="valign"			  
			  />
		</Col>
		<Col s={2} l={2} m={2}>
			 <a className="btn-floating btn-small waves-effect waves-light purple lighten-3 valign" onClick={this.props.onRemove.bind(null,this.props.id)}><i className="material-icons">delete</i></a>
		</Col>
	  
	</Row>
    );
  }
}

export default Liability;