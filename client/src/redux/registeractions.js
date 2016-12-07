require ('isomorphic-fetch').fetch;
var FormData = require('form-data');

var REGISTER_SUCCESS = 'REGISTER_SUCCESS';
var registerSuccess = function(user) {
    return {
        type: REGISTER_SUCCESS,
        user: user,
		message:'Registration Complete'
    }
};
var REGISTER_ERROR = 'REGISTER_ERROR';
var registerError = function(error) {
    return {
        type: REGISTER_ERROR,
        error: error
    }
};

var REGISTER = 'REGISTER';
var register = function(user) {
    return function(dispatch) {
		var url = "/users";
		
		var bodyStr="username=" + encodeURIComponent(user.email);
		bodyStr=bodyStr+"&password=" + encodeURIComponent(user.password);
		bodyStr=bodyStr+"&firstname=" + encodeURIComponent(user.firstname);
		bodyStr=bodyStr+"&lastname=" + encodeURIComponent(user.lastname);
		var formData={ method: "POST",
			body: bodyStr ,
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		  }
		};
				
        return fetch(url, formData).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
				console.error('DEBUG DEBUG client side 1: '+error);
                throw error;
            }
            return response;
        })
        .then(function(response) {
			console.error('DEBUG DEBUG client side 2: ');
            return response.json();
        })
        .then(function(data) {
			if(data !== undefined && data.username){
				console.error('DEBUG DEBUG client side 3: '+data.username);
				user.email=data.username;
				user.firstname=data.firstname;
				user.lastname=data.lastname;
				return dispatch( registerSuccess(user));
			}else{
				var errMsg=JSON.parse(data).error;
				console.error('DEBUG DEBUG client side 4: '+errMsg);
				return dispatch(
					registerError(errMsg)
				);
			}
            
        })
        .catch(function(error) {
			console.error('DEBUG DEBUG client side 5: '+error.message);
			console.error('DEBUG DEBUG client side 6: '+error);
            return dispatch(
                registerError(error.message)
            );
        });
	}
};


exports.REGISTER = REGISTER;
exports.registerApi = register;
exports.REGISTER_SUCCESS= REGISTER_SUCCESS;
exports.registerSuccess = registerSuccess;
exports.REGISTER_ERROR = REGISTER_ERROR;
exports.registerSuccess = registerSuccess;