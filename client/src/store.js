var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var combineReducers=redux.combineReducers;
var thunk = require('redux-thunk').default;
var reducers = require('./redux/reducers');
var routerMiddleware=require('react-router-redux').routerMiddleware;
var routerReducer=require('react-router-redux').routerReducer;
var hashHistory=require('react-router').hashHistory;

var rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});
var middleware = applyMiddleware(
  routerMiddleware(hashHistory),
  thunk
);
var store = createStore(rootReducer,middleware);
module.exports  = store;