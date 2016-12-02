var loginActions = require('./loginactions');
var registerActions = require('./registeractions');
var liabilityActions = require('./liabilityactions');
var assetActions = require('./assetactions');

var User = {
	email:'',
	password:'',
	firstname:'',
	lastname:''
};

var loginReducer = function(state, action) {
    state = state || User;
	if (action.type === loginActions.LOGIN) {
        return action.user;
    }else if (action.type === loginActions.LOGIN_SUCCESS) {
        return action.user;
    }else if (action.type === loginActions.LOGIN_ERROR) {
        return {
            error: action.error
        };
    }else if (action.type === loginActions.LOGOUT) {
        return User;
    }
    return state;
};

var registrationReducer = function(state, action) {
    state = state || User;
	if (action.type === registerActions.REGISTER) {
        return action.user;
    }else if (action.type === registerActions.REGISTER_SUCCESS) {
        return action.user;
    }else if (action.type === registerActions.REGISTER_ERROR) {
        return {
            error: action.error
        };
    }
    return state;
};

var Liabilities = [{
	type:'',
	description:'',
	purpose:'',
	start_date:'',
	expected_pay_off_date:'',
	actual_pay_off_date:'',
	is_paid_up:'No',
	is_income_generating:'No',
	original_amount:'',
	paid_up_amount:'',
	remaining_amount:''
}];

var emptyLiabilityObj={
	type:'',
	description:'',
	purpose:'',
	start_date:'',
	expected_pay_off_date:'',
	actual_pay_off_date:'',
	is_paid_up:'No',
	is_income_generating:'No',
	original_amount:'',
	paid_up_amount:'',
	remaining_amount:''
}

var Assets = [{
	type:'',
	description:'',
	location:'',
	cash:'',
	aquired_date:'',
	is_income_generating:'No',
	is_financed:'No',
	financed_value:'',
	net_value:''
}];

var emptyAsset={
	type:'',
	description:'',
	location:'',
	cash:'',
	aquired_date:'',
	is_income_generating:'No',
	is_financed:'No',
	financed_value:'',
	net_value:''
}

var Networth={
	assets:Assets,
	liabilities:Liabilities,
	stats:{
		net:0,
		totalDebt:0,
		totalAssets:0
	}
}
var calcNetWorth=function(pAssets,pLibilities){
	var retVal={
		net:0,
		totalDebt:0,
		totalAssets:0
	};
	for (var value of pAssets) {
	  var netVal=value.net_value;
	  if(netVal && !isNaN(netVal)){
			retVal.net+=parseFloat(netVal);
			retVal.totalAssets+=parseFloat(netVal);
		}
	}
	for (var value of pLibilities) {
	  var remainingBalance=value.remaining_amount;
	  if(remainingBalance && !isNaN(remainingBalance)){
			retVal.net-=parseFloat(remainingBalance);
			retVal.totalDebt+=parseFloat(remainingBalance);
		}
	}
	return retVal;
}
var networthReducer = function(state, action) {
    state = state || Networth;
	var assets=state.assets;
	var liabilities=state.liabilities;
	if (action.type === loginActions.LOGIN_SUCCESS || action.type === assetActions.ASSET_SUCCESS || action.type === liabilityActions.LIABILITY_SUCCESS) {
		assets=action.user.currentNetworth[0].assets;
		liabilities=action.user.currentNetworth[0].liabilities;
    }else	if (action.type === loginActions.LOGOUT) {
		return Networth;		
    }else if (action.type === liabilityActions.UPDATE_LIABILITY_T) {
		var updateObj=action.liability;
		var updatedStateObj=liabilities[updateObj.index];
		updatedStateObj[updateObj.id]=updateObj.value;
		liabilities=liabilities.slice(0,updateObj.index).
				concat(updatedStateObj).
				concat(liabilities.slice(updateObj.index+1));		
    }else if (action.type === assetActions.UPDATE_ASSET_T) {
		var updateObj=action.asset;
		var updatedStateObj=assets[updateObj.index];
		updatedStateObj[updateObj.id]=updateObj.value;
		assets=assets.slice(0,updateObj.index).
				concat(updatedStateObj).
				concat(assets.slice(updateObj.index+1));		
    }
	var updatedNetWorth=calcNetWorth(assets,liabilities);
	return Object.assign({}, state, {
			assets: assets,
			liabilities:liabilities,
			stats:updatedNetWorth
		  });
};
exports.loginReducer = loginReducer;
exports.registrationReducer=registrationReducer;
exports.networthReducer=networthReducer;