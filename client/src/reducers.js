var actions = require('./actions');

var initialAddressState = {
	Address1:'3005 Martha Dr',
	Address2:'',
	City:'Wylie',
	State:'TX',
	Zip5:'75098'
};

var addressReducer = function(state, action) {
    state = state || initialAddressState;
	if (action.type === actions.STANDARDIZE) {
        return action.address;
    }else if (action.type === actions.STANDARDIZE_SUCCESS) {
		//browserHistory.push('/#/address');
		//store.dispatch(push('/#/address'));
        return action.address;
    }else if (action.type === actions.STANDARDIZE_ERROR) {
        return {
            error: action.error
        };
    }
    return state;
};

exports.addressReducer = addressReducer;