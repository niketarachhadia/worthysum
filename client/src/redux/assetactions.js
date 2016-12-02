require ('isomorphic-fetch').fetch;
var FormData = require('form-data');

var ASSET_SUCCESS = 'ASSET_SUCCESS';
var assetSuccess = function(user) {
    return {
        type: ASSET_SUCCESS,
        user: user
    }
};
var ASSET_ERROR = 'ASSET_ERROR';
var assetError = function(error) {
    return {
        type: ASSET_ERROR,
        error: error
    }
};

var UPDATE_ASSET = 'UPDATE_ASSET';
var updateAsset = function(updateObj,userName) {
    return function(dispatch) {
		var url = "/asset";
		
		var bodyStr="username=" + encodeURIComponent(userName);
		bodyStr=bodyStr+"&assetIndex=" + encodeURIComponent(updateObj.index);
		bodyStr=bodyStr+"&fieldName=" + encodeURIComponent(updateObj.id);
		bodyStr=bodyStr+"&fieldValue=" + encodeURIComponent(updateObj.value);
		var formData={ method: "PUT",
			body: bodyStr ,
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		  }
		};
				
        return fetch(url, formData).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
			if(data !== undefined && data.username){
				data.email=data.username;
				return dispatch( assetSuccess(data));
			}else{
				var errMsg=JSON.parse(data).error;
				return dispatch(
					assetError(errMsg)
				);
			}
            
        })
        .catch(function(error) {
            return dispatch(
                assetError(error.message)
            );
        });
	}
};

var REMOVE_ASSET = 'REMOVE_ASSET';
var removeAsset = function(removeObj,userName) {
    return function(dispatch) {
		var url = "/asset";
		
		var bodyStr="username=" + encodeURIComponent(userName);
		bodyStr=bodyStr+"&assetIndex=" + encodeURIComponent(removeObj.index);
		var formData={ method: "DELETE",
			body: bodyStr ,
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		  }
		};
				
        return fetch(url, formData).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
			if(data !== undefined && data.username){
				data.email=data.username;
				return dispatch( assetSuccess(data));
			}else{
				var errMsg=JSON.parse(data).error;
				return dispatch(
					assetError(errMsg)
				);
			}
            
        })
        .catch(function(error) {
            return dispatch(
                assetError(error.message)
            );
        });
	}
};
var UPDATE_ASSET_T="UPDATE_ASSET_T";
var updateAssetTransient=function(updateObj){
	return{
		type:UPDATE_ASSET_T,
		asset:updateObj
	}
}


exports.UPDATE_ASSET = UPDATE_ASSET;
exports.updateAsset = updateAsset;
exports.REMOVE_ASSET = REMOVE_ASSET;
exports.removeAsset = removeAsset;
exports.ASSET_SUCCESS = ASSET_SUCCESS;
exports.assetSuccess = assetSuccess;
exports.ASSET_ERROR = ASSET_ERROR;
exports.assetError = assetError;
exports.UPDATE_ASSET_T = UPDATE_ASSET_T;
exports.updateAssetTransient = updateAssetTransient;
