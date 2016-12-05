import React, { Component } from 'react';
import {Row,Col,Card} from 'react-materialize';
import {PieChart} from 'react-d3';
import * as d3 from "d3";
import {scaleOrdinal} from "d3-scale";
class Chart extends Component {
  
  valueFunction (d) {
      return 100;
    }
    name(d) {
      return d.label;
    }
  render() {
	let totalAmt=Math.abs(this.props.networth.totalDebt)+this.props.networth.totalAssets;
	if(totalAmt>0){
		let debts=parseFloat((this.props.networth.totalDebt*100)/totalAmt).toFixed(2);
		let assets=parseFloat((this.props.networth.totalAssets*100)/totalAmt).toFixed(2);
		let pieData = [{label:'Loans',value:debts},{label:'Assets',value:assets}];
		let colorScale = ['#ce93d8','#9c27b0'];
		let color = scaleOrdinal()
		  .range(["#ce93d8", "#9c27b0"]);
		return (
			<Row className="center-align">
				<Col className="collection">
						<li className="collection-item purple lighten-3">
							<span >Loans</span>
						</li>
						
						<li className="collection-item purple darken-2">
							<span >Assets</span>
						</li>
					
				</Col>
				<Col className="white-text left-align s4 m4 l4">
					<PieChart
					  data={pieData}
					  width={180}
					  height={130} 
					  radius={60}
					  innerRadius={5}
					  sectorBorderColor="white"
					  colors={color}
					  showOuterLabels={false}
					  showInnerLabels={true}
					  />
				</Col>
			</Row>
		);
	}else{
		return (
			<Row>
			</Row>
		);
	}
	
  }
}

export default Chart;