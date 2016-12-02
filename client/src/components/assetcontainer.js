import React, { Component } from 'react';
import {Row} from 'react-materialize';
import {connect} from 'react-redux';
import Asset from './asset';
import {updateAsset,removeAsset} from '../redux/assetactions';

class AssetContainer extends Component {
	
  render() {
    return (
      <div id="assets" className="card card-content white-text purple lighten-3">
		<Row className="center-align">
			<span className="card-title center-align">Assets</span>
		</Row>		
		{this.props.assets.map((asset,index)=>{
			return <Asset key={index} id={index} asset={asset} onChange={this.props.onChange} onRemove={this.props.onRemove} onSave={this.props.onSave}/>
		})}	
	  </div>
    );
  }
}

export default AssetContainer;