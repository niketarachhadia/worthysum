import React, { Component } from 'react';
import {Row,Input,Col} from 'react-materialize';

const types=['Real Estate','Retirement Fund','Stocks/Bonds','Commodities','Foreign Exchange', 'Cash/Saving Accout', 'Private Loans','Cars','Other Assets'];

class Asset extends Component {  
  render() {
	console.log("DEBUG asset props: "+JSON.stringify(this.props));
    return (
	<Row className="purple darken-3 valign-wrapper">
		
			<Col s={3} l={3} m={3}>
				<Input s={12} m={12} l={12} type='select' value={this.props.asset.type} onChange={this.props.onSave.bind(null,this.props.id)} id={'type-'+this.props.id}
				>
					<option value={''}>Asset Type</option>
					{types.map((type)=>{
						return <option value={type}>{type}</option>
					})}
				  </Input>
			</Col>
		<Col s={3} l={3} m={3}>
			<Input type="text" s={12} m={12} l={12}
			  label="Description"
			  id={'description-'+this.props.id}
			  value={this.props.asset.description}
			  onChange={this.props.onChange.bind(null,this.props.id)}
			  onBlur={this.props.onSave.bind(null,this.props.id)}
			  className="valign"
			  />
		</Col>		
		<Col s={4} l={4} m={4}>
			 <Input type="number" 
			  label="Owned Value"
			  id={'net_value-'+this.props.id}
			  value={this.props.asset.net_value}
			  onChange={this.props.onChange.bind(null,this.props.id)} 
			  onBlur={this.props.onSave.bind(null,this.props.id)}
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

export default Asset;