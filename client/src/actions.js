require ('isomorphic-fetch').fetch;

var STANDARDIZE_SUCCESS = 'STANDARDIZE_SUCCESS';
var standardizeSuccess = function(address) {
    return {
        type: STANDARDIZE_SUCCESS,
        address: address
    }
};
var STANDARDIZE_ERROR = 'STANDARDIZE_ERROR';
var standardizeError = function(error) {
    return {
        type: STANDARDIZE_ERROR,
        error: error
    }
};

var STANDARDIZE = 'STANDARDIZE';
var standardize = function(address) {
    return function(dispatch) {
		var url = "https://us-street.api.smartystreets.com/street-address?auth-id=d7becb6f-eaf5-6203-2bfc-8fd8b7e5453f&auth-token=pikk5MTKJW9RQcrdJvcK&candidates=10";
		
		url=url+"&street="+address.Address1;
		url=url+"&street2="+address.Address2;
		url=url+"&city="+address.City;
		url=url+"&state="+address.State;
		url=url+"&zipcode="+address.Zip5;
        return fetch(url).then(function(response) {
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
			if(data !== undefined && data.length>0){
				var retAddress=data[0].components;
				address.Address1=retAddress.primary_number+' '+retAddress.street_name+' '+retAddress.street_suffix;
				address.Address2=retAddress.secondary_number+' '+retAddress.secondary_designator;
				address.City=retAddress.city_name;
				address.State=retAddress.state_abbreviation;
				address.Zip5=retAddress.zipcode+'-'+retAddress.plus4_code;
				return dispatch( standardizeSuccess(address));
			}else{
				return dispatch(
					standardizeError('Invalid Address')
				);
			}
            
        })
        .catch(function(error) {
            return dispatch(
                standardizeError(error)
            );
        });
	}
};


exports.STANDARDIZE = STANDARDIZE;
exports.standardizeAddress = standardize;
exports.STANDARDIZE_SUCCESS = STANDARDIZE_SUCCESS;
exports.standardizeSuccess = standardizeSuccess;
exports.STANDARDIZE_ERROR = STANDARDIZE_ERROR;
exports.standardizeError = standardizeError;