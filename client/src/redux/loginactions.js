require ('isomorphic-fetch').fetch;
var FormData = require('form-data');
var cookie = require('react-cookie'); 
var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var loginSuccess = function(user) {
    return {
        type: LOGIN_SUCCESS,
        user: user
    }
};
var LOGIN_ERROR = 'LOGIN_ERROR';
var loginError = function(error) {
    return {
        type: LOGIN_ERROR,
        error: error
    }
};
var LOGOUT = 'LOGOUT';
var logOut = function() {
	cookie.remove('ws_email',  { path: '/' });
	cookie.remove('ws_firstname',  { path: '/' });
	cookie.remove('ws_lastname',  { path: '/' });
    return {
        type: LOGOUT
    }
};

var LOGIN = 'LOGIN';
var login = function(user) {
    return function(dispatch) {
		var url = "/login";
		
		var bodyStr="username=" + encodeURIComponent(user.email);
		bodyStr=bodyStr+"&password=" + encodeURIComponent(user.password);
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
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
			if(data !== undefined && data.username){
				user.email=data.username;
				user.firstname=data.firstname;
				user.lastname=data.lastname;
				user.currentNetworth=data.currentNetworth;
				user.netWorth=data.netWorth;
				cookie.save('ws_email', user.email, { path: '/' });
				cookie.save('ws_firstname', user.firstname, { path: '/' });
				cookie.save('ws_lastname', user.lastname, { path: '/' });
				return dispatch( loginSuccess(user));
			}else{
				var errMsg=JSON.parse(data).error;
				return dispatch(
					loginError(errMsg)
				);
			}
            
        })
        .catch(function(error) {
            return dispatch(
                loginError(error.message)
            );
        });
	}
};


exports.LOGIN = LOGIN;
exports.loginApi = login;
exports.LOGOUT = LOGOUT;
exports.logoutApi = logOut;
exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
exports.loginSuccess = loginSuccess;
exports.LOGIN_ERROR = LOGIN_ERROR;
exports.loginError = loginError;