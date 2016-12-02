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
		if(event && ((event.type=="keydown" && event.keyCode == 13) || event.type=="blur")){
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
		if(event && ((event.type=="keydown" && event.keyCode == 13) || event.type=="blur")){
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
      <div id="networth">
			<Row>
				<Col l={6} m={6} s={12}>
					<Chart networth={this.props.networth.stats}/>
				</Col>
				<Col l={6} m={6} s={12}>
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
			
		</div>
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