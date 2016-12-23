import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import LiabilityContainer from './liabilitycontainer';
import AssetContainer from './assetcontainer';
import Stats from './stats';
import Subnav from './subnav';
import Chart from './chart';
import {connect} from 'react-redux';
import {updateAsset,removeAsset,updateAssetTransient} from '../redux/assetactions';
import {updateLiability,removeLiability,updateLiabilityTransient} from '../redux/liabilityactions';
import cookie from 'react-cookie';  
import $ from 'jquery';
class Networth extends Component {
  componentDidMount(){
    $('label').addClass('active')
  }
  handleAssetChange(index,event) {	
		if(event){
			let idParam=event.target.id.substr(0, event.target.id.indexOf('-'));
			
			let updateObj={
			index:index,
			id:idParam,
			value:event.target.value
			}
			const promise=this.props.dispatch(
				updateAssetTransient(updateObj)
			);
		}			 
	}
	handleAssetUpdate(index,event) {	
		if(event && ((event.type=="keydown" && event.keyCode == 13) || event.type=="blur" || event.type=="change")){
			let idParam=event.target.id.substr(0, event.target.id.indexOf('-'));
			let updateObj={
			index:index,
			id:idParam,
			value:event.target.value
			}
			const promise=this.props.dispatch(
				updateAsset(updateObj,this.props.user.email)
			);
		}			 
	}
	handleAssetRemove(index,event) {	
		if(event){
			let removeObj={
			index:index
			}
			const promise=this.props.dispatch(
				removeAsset(removeObj,this.props.user.email)
			);
		}			 
	}
	handleLiabilityChange(index,event) {	
		if(event){
			let idParam=event.target.id.substr(4);
			idParam=idParam.substr(0, idParam.indexOf('-'));
			let updateObj={
			index:index,
			id:idParam,
			value:event.target.value
			}
			const promise=this.props.dispatch(
				updateLiabilityTransient(updateObj)
			);
		}			 
	}
	handleLiabilityUpdate(index,event) {	
		if(event && ((event.type=="keydown" && event.keyCode == 13) || event.type=="blur" || event.type=="change")){
			let idParam=event.target.id.substr(4);
			idParam=idParam.substr(0, idParam.indexOf('-'));
			let updateObj={
			index:index,
			id:idParam,
			value:event.target.value
			}
			const promise=this.props.dispatch(
				updateLiability(updateObj,this.props.user.email)
			);
		}			 
	}
	handleLiabilityRemove(index,event) {	
		if(event){
			let removeObj={
			index:index
			}
			const promise=this.props.dispatch(
				removeLiability(removeObj,this.props.user.email)
			);
		}			 
	}
  render() {
    return (
	<Row>
      <div id="networth" className="col l10 m10 offset-l1 offset-m1 offset-s1 s10">
			<Row>
				<Col l={6} m={6} s={12} className="offset-l3 offset-m3">
					<Stats networth={this.props.networth.stats}/>
				</Col>
			</Row>
			<Row>
				<Col l={6} m={6} s={12}>
					<LiabilityContainer liabilities={this.props.networth.liabilities} onChange={this.handleLiabilityChange.bind(this)} onRemove={this.handleLiabilityRemove.bind(this)} onSave={this.handleLiabilityUpdate.bind(this)}/>
				</Col>
				<Col l={6} m={6} s={12}>
					<AssetContainer assets={this.props.networth.assets} onChange={this.handleAssetChange.bind(this)} onRemove={this.handleAssetRemove.bind(this)} onSave={this.handleAssetUpdate.bind(this)}/>
				</Col>
			</Row>	
			<Row>
				<Col l={6} m={6} s={12} className="offset-l3 offset-m3 hide-on-small-only">
					<Chart networth={this.props.networth.stats}/>
				</Col>
			</Row>
			
		</div>
	</Row>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
		networth:state.networthReducer,
		user:state.loginReducer
  }
}

const Container = connect(mapStateToProps)(Networth);
export default Container;