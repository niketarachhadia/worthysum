require ('isomorphic-fetch').fetch;
var FormData = require('form-data');

var LIABILITY_SUCCESS = 'LIABILITY_SUCCESS';
var liabilitySuccess = function(user) {
    return {
        type: LIABILITY_SUCCESS,
        user: user
    }
};
var LIABILITY_ERROR = 'LIABILITY_ERROR';
var liabilityError = function(error) {
    return {
        type: LIABILITY_ERROR,
        error: error
    }
};
var UPDATE_LIABILITY = 'UPDATE_LIABILITY';
var updateLiability = function(updateObj,userName) {
    return function(dispatch) {
		var url = "/liability";
		
		var bodyStr="username=" + encodeURIComponent(userName);
		bodyStr=bodyStr+"&liabilityIndex=" + encodeURIComponent(updateObj.index);
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
				return dispatch( liabilitySuccess(data));
			}else{
				var errMsg=JSON.parse(data).error;
				return dispatch(
					liabilityError(errMsg)
				);
			}
            
        })
        .catch(function(error) {
            return dispatch(
                liabilityError(error.message)
            );
        });
	}
};

var REMOVE_LIABILITY = 'REMOVE_LIABILITY';
var removeLiability = function(removeObj,userName) {
    return function(dispatch) {
		var url = "/liability";
		
		var bodyStr="username=" + encodeURIComponent(userName);
		bodyStr=bodyStr+"&liabilityIndex=" + encodeURIComponent(removeObj.index);
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
				return dispatch( liabilitySuccess(data));
			}else{
				var errMsg=JSON.parse(data).error;
				return dispatch(
					liabilityError(errMsg)
				);
			}
            
        })
        .catch(function(error) {
            return dispatch(
                liabilityError(error.message)
            );
        });
	}
};
var UPDATE_LIABILITY_T="UPDATE_LIABILITY_T";
var updateLiabilityTransient=function(updateObj){
	return{
		type:UPDATE_LIABILITY_T,
		liability:updateObj
	}
}

exports.UPDATE_LIABILITY = UPDATE_LIABILITY;
exports.updateLiability = updateLiability;
exports.REMOVE_LIABILITY = REMOVE_LIABILITY;
exports.removeLiability = removeLiability;
exports.LIABILITY_SUCCESS = LIABILITY_SUCCESS;
exports.liabilitySuccess = liabilitySuccess;
exports.LIABILITY_ERROR = LIABILITY_ERROR;
exports.liabilityError = liabilityError;
exports.UPDATE_LIABILITY_T = UPDATE_LIABILITY_T;
exports.updateLiabilityTransient = updateLiabilityTransient;
