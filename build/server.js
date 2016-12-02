(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console, module) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _express = __webpack_require__(6);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bodyParser = __webpack_require__(8);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _bcryptjs = __webpack_require__(9);
	
	var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
	
	var _userModel = __webpack_require__(10);
	
	var _userModel2 = _interopRequireDefault(_userModel);
	
	var _passport = __webpack_require__(15);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _config = __webpack_require__(19);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var server = void 0;
	function runServer(callback) {
		_mongoose2.default.connect(_config2.default.DATABASE_URL, function (err) {
			if (err && callback) {
				return callback(err);
			}
	
			server = app.listen(_config2.default.PORT, function () {
				console.log('Listening on localhost:' + _config2.default.PORT);
				if (callback) {
					callback();
				}
			});
		});
	};
	
	if (__webpack_require__.c[0] === module) {
		runServer(function (err) {
			if (err) {
				console.error(err);
			}
		});
	};
	
	var app = (0, _express2.default)();
	var jsonParser = _bodyParser2.default.json();
	var urlParser = _bodyParser2.default.urlencoded({
		extended: true
	});
	app.use(jsonParser);
	app.use(urlParser);
	app.use(_passport2.default.initialize());
	app.use(_express2.default.static('client/build'));
	app.post('/login', _passport2.default.authenticate('local', { failWithError: true }), function (req, res) {
		var username = req.body.username;
		_userModel2.default.findOne({ username: username }, function (err, user) {
			console.log("DEBUG login user found: " + JSON.stringify(user));
			return res.status(201).json(user);
		});
	}, function (err, req, res, next) {
		return res.json(err);
	});
	
	app.post('/users', function (req, res) {
		if (!req.body) {
			return res.status(400).json({
				message: "No request body"
			});
		}
	
		if (!('username' in req.body)) {
			return res.status(422).json({
				message: 'Missing field: username'
			});
		}
	
		var username = req.body.username;
	
		if (typeof username !== 'string') {
			return res.status(422).json({
				message: 'Incorrect field type: username'
			});
		}
	
		username = username.trim();
	
		if (username === '') {
			return res.status(422).json({
				message: 'Incorrect field length: username'
			});
		}
	
		if (!('password' in req.body)) {
			return res.status(422).json({
				message: 'Missing field: password'
			});
		}
	
		var password = req.body.password;
	
		if (typeof password !== 'string') {
			return res.status(422).json({
				message: 'Incorrect field type: password'
			});
		}
	
		password = password.trim();
	
		if (password === '') {
			return res.status(422).json({
				message: 'Incorrect field length: password'
			});
		}
	
		_bcryptjs2.default.genSalt(10, function (err, salt) {
			if (err) {
				return res.status(500).json({
					message: 'salt error' + err
				});
			}
			_bcryptjs2.default.hash(password, salt, function (err, hash) {
				if (err) {
					return res.status(500).json({
						message: 'encryption error' + err
					});
				}
				var firstname = req.body.firstname;
				var lastname = req.body.lastname;
	
				var initialNetworth = [{
					assets: [{
						type: "",
						description: "",
						net_value: 0,
						index: 0
					}],
					liabilities: [{
						type: "",
						description: "",
						remaining_amount: 0,
						index: 0
					}],
					stats: [{
						net: 0,
						totalDebt: 0,
						totalAssets: 0
					}]
				}];
				var user = new _userModel2.default({
					username: username,
					password: hash,
					firstname: firstname,
					lastname: lastname,
					currentNetworth: initialNetworth,
					netWorth: [{
						year: new Date().getUTCFullYear(),
						month: new Date().getUTCMonth(),
						details: initialNetworth
					}]
				});
				user.save(function (err) {
					if (err) {
						return res.status(500).json({
							message: 'Database Error'
						});
					}
					console.log("DEBUG with init networh " + JSON.stringify(user));
					return res.status(201).json(user);
				});
			});
		});
	});
	
	app.put('/liability', function (req, res) {
		if (!req.body) {
			return res.status(400).json({
				message: "No request body"
			});
		}
		var username = req.body.username;
		var liabilityIndex = req.body.liabilityIndex;
		var fieldName = req.body.fieldName;
		var fieldValue = req.body.fieldValue;
		_userModel2.default.findOne({ username: username }, function (err, user) {
	
			if (user.currentNetworth[0].liabilities.length > liabilityIndex) {
				var liability = user.currentNetworth[0].liabilities[liabilityIndex];
				liability[fieldName] = fieldValue;
			}
	
			var lastLiability = user.currentNetworth[0].liabilities[user.currentNetworth[0].liabilities.length - 1];
			if (lastLiability.type != '' || lastLiability.description != '' || lastLiability.remaining_amount != 0) {
				user.currentNetworth[0].liabilities.push({
					type: "",
					description: "",
					remaining_amount: 0,
					index: lastLiability.index + 1
				});
			}
			user.save();
			return res.status(200).json(user);
		});
	});
	app.delete('/liability', function (req, res) {
		if (!req.body) {
			return res.status(400).json({
				message: "No request body"
			});
		}
		var username = req.body.username;
		var liabilityIndex = req.body.liabilityIndex;
		_userModel2.default.findOne({ username: username }, function (err, user) {
			if (user.currentNetworth[0].liabilities.length > liabilityIndex) {
				var liability = user.currentNetworth[0].liabilities[liabilityIndex];
				liability.remove();
			}
			var emptyLiability = {
				type: "",
				description: "",
				remaining_amount: 0
			};
			if (user.currentNetworth[0].liabilities.length == 0) {
				emptyLiability.index = 0;
				user.currentNetworth[0].liabilities.push(emptyLiability);
			} else {
				var lastLiability = user.currentNetworth[0].liabilities[user.currentNetworth[0].liabilities.length - 1];
				if (lastLiability.type != '' || lastLiability.description != '' || lastLiability.remaining_amount != 0) {
					emptyLiability.index = lastLiability.index + 1;
					user.currentNetworth[0].liabilities.push(emptyLiability);
				}
			}
			user.save();
			return res.status(200).json(user);
		});
	});
	app.put('/asset', function (req, res) {
		if (!req.body) {
			return res.status(400).json({
				message: "No request body"
			});
		}
		var username = req.body.username;
		var assetIndex = req.body.assetIndex;
		var fieldName = req.body.fieldName;
		var fieldValue = req.body.fieldValue;
		_userModel2.default.findOne({ username: username }, function (err, user) {
	
			if (user.currentNetworth[0].assets.length > assetIndex) {
				var asset = user.currentNetworth[0].assets[assetIndex];
				asset[fieldName] = fieldValue;
			}
	
			var lastAsset = user.currentNetworth[0].assets[user.currentNetworth[0].assets.length - 1];
			if (lastAsset.type != '' || lastAsset.description != '' || lastAsset.net_value != 0) {
				user.currentNetworth[0].assets.push({
					type: "",
					description: "",
					net_value: 0,
					index: lastAsset.index + 1
				});
			}
			user.save();
			return res.status(200).json(user);
		});
	});
	app.delete('/asset', function (req, res) {
		if (!req.body) {
			return res.status(400).json({
				message: "No request body"
			});
		}
		var username = req.body.username;
		var assetIndex = req.body.assetIndex;
		_userModel2.default.findOne({ username: username }, function (err, user) {
			if (user.currentNetworth[0].assets.length > assetIndex) {
				var asset = user.currentNetworth[0].assets[assetIndex];
				asset.remove();
			}
			var emptyAsset = {
				type: "",
				description: "",
				net_value: 0
			};
			if (user.currentNetworth[0].assets.length == 0) {
				emptyAsset.index = 0;
				user.currentNetworth[0].assets.push(emptyAsset);
			} else {
				var lastAsset = user.currentNetworth[0].assets[user.currentNetworth[0].assets.length - 1];
				if (lastAsset.type != '' || lastAsset.description != '' || lastAsset.net_value != 0) {
					emptyAsset.index = lastAsset.index + 1;
					user.currentNetworth[0].assets.push(emptyAsset);
				}
			}
			user.save();
			return res.status(200).json(user);
		});
	});
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(5)(module)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global window, global*/
	var util = __webpack_require__(2)
	var assert = __webpack_require__(3)
	var now = __webpack_require__(4)
	
	var slice = Array.prototype.slice
	var console
	var times = {}
	
	if (typeof global !== "undefined" && global.console) {
	    console = global.console
	} else if (typeof window !== "undefined" && window.console) {
	    console = window.console
	} else {
	    console = {}
	}
	
	var functions = [
	    [log, "log"],
	    [info, "info"],
	    [warn, "warn"],
	    [error, "error"],
	    [time, "time"],
	    [timeEnd, "timeEnd"],
	    [trace, "trace"],
	    [dir, "dir"],
	    [consoleAssert, "assert"]
	]
	
	for (var i = 0; i < functions.length; i++) {
	    var tuple = functions[i]
	    var f = tuple[0]
	    var name = tuple[1]
	
	    if (!console[name]) {
	        console[name] = f
	    }
	}
	
	module.exports = console
	
	function log() {}
	
	function info() {
	    console.log.apply(console, arguments)
	}
	
	function warn() {
	    console.log.apply(console, arguments)
	}
	
	function error() {
	    console.warn.apply(console, arguments)
	}
	
	function time(label) {
	    times[label] = now()
	}
	
	function timeEnd(label) {
	    var time = times[label]
	    if (!time) {
	        throw new Error("No such label: " + label)
	    }
	
	    var duration = now() - time
	    console.log(label + ": " + duration + "ms")
	}
	
	function trace() {
	    var err = new Error()
	    err.name = "Trace"
	    err.message = util.format.apply(null, arguments)
	    console.error(err.stack)
	}
	
	function dir(object) {
	    console.log(util.inspect(object) + "\n")
	}
	
	function consoleAssert(expression) {
	    if (!expression) {
	        var arr = slice.call(arguments, 1)
	        assert.ok(false, util.format.apply(null, arr))
	    }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("date-now");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("bcryptjs");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bcryptjs = __webpack_require__(9);
	
	var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
	
	var _networthModel = __webpack_require__(11);
	
	var _networthModel2 = _interopRequireDefault(_networthModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UserSchema = new _mongoose2.default.Schema({
	    username: {
	        type: String,
	        required: true,
	        unique: true
	    },
	    firstname: {
	        type: String,
	        required: false,
	        unique: false
	    },
	    lastname: {
	        type: String,
	        required: false,
	        unique: false
	    },
	    password: {
	        type: String,
	        required: true
	    },
	    currentNetworth: [_networthModel2.default],
	    netWorth: [{
	        year: Number,
	        month: Number,
	        details: [_networthModel2.default]
	    }]
	});
	
	UserSchema.methods.validatePassword = function (password, callback) {
	    _bcryptjs2.default.compare(password, this.password, function (err, isValid) {
	        if (err) {
	            callback(err);
	            return;
	        }
	        callback(null, isValid);
	    });
	};
	
	var User = _mongoose2.default.model('User', UserSchema);
	
	exports.default = User;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _liabilityModel = __webpack_require__(12);
	
	var _liabilityModel2 = _interopRequireDefault(_liabilityModel);
	
	var _assetModel = __webpack_require__(13);
	
	var _assetModel2 = _interopRequireDefault(_assetModel);
	
	var _statsModel = __webpack_require__(14);
	
	var _statsModel2 = _interopRequireDefault(_statsModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NetworthSchema = new _mongoose2.default.Schema({
		liabilities: [_liabilityModel2.default],
		assets: [_assetModel2.default],
		stats: [_statsModel2.default]
	});
	
	var Networth = _mongoose2.default.model('Networth', NetworthSchema);
	
	exports.default = NetworthSchema;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	       value: true
	});
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LiabilitySchema = new _mongoose2.default.Schema({
	       type: {
	              type: String,
	              required: false
	       },
	       description: {
	              type: String,
	              required: false,
	              unique: false
	       },
	       remaining_amount: {
	              type: Number,
	              required: false,
	              unique: false
	       },
	       index: {
	              type: Number,
	              required: true,
	              unique: true
	       }
	});
	
	var Liability = _mongoose2.default.model('Liability', LiabilitySchema);
	
	exports.default = LiabilitySchema;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	       value: true
	});
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AssetSchema = new _mongoose2.default.Schema({
	       type: {
	              type: String,
	              required: false
	       },
	       description: {
	              type: String,
	              required: false,
	              unique: false
	       },
	       net_value: {
	              type: Number,
	              required: false,
	              unique: false
	       },
	       index: {
	              type: Number,
	              required: true,
	              unique: true
	       }
	});
	
	var Asset = _mongoose2.default.model('Asset', AssetSchema);
	
	exports.default = AssetSchema;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	       value: true
	});
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StatsSchema = new _mongoose2.default.Schema({
	       net: {
	              type: Number,
	              required: false
	       },
	       totalDebt: {
	              type: Number,
	              required: false,
	              unique: false
	       },
	       totalAssets: {
	              type: Number,
	              required: false,
	              unique: false
	       }
	});
	
	var Stats = _mongoose2.default.model('Stats', StatsSchema);
	
	exports.default = StatsSchema;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _passport = __webpack_require__(16);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _passportHttp = __webpack_require__(17);
	
	var _passportHttp2 = _interopRequireDefault(_passportHttp);
	
	var _passportLocal = __webpack_require__(18);
	
	var _passportLocal2 = _interopRequireDefault(_passportLocal);
	
	var _userModel = __webpack_require__(10);
	
	var _userModel2 = _interopRequireDefault(_userModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BasicStrategy = _passportHttp2.default.BasicStrategy;
	var LocalStrategy = _passportLocal2.default.Strategy;
	
	var strategy = new LocalStrategy('local', function (username, password, done) {
	  _userModel2.default.findOne({ username: username }, function (err, user) {
	    if (err) {
	      return done(err);
	    }
	    if (!user) {
	      return done('{"error":"User does not exist"}', false);
	    }
	    user.validatePassword(password, function (err, isValid) {
	      if (err !== null || !isValid) {
	        return done('{"error":"Invalid Password"}', false);
	      }
	      return done(null, user);
	    });
	  });
	});
	_passport2.default.serializeUser(function (user, done) {
	  done(null, user.id);
	});
	
	// used to deserialize the user
	_passport2.default.deserializeUser(function (id, done) {
	  _userModel2.default.findById(id, function (err, user) {
	    done(err, user);
	  });
	});
	
	_passport2.default.use(strategy);
	exports.default = _passport2.default;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("passport-http");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	     value: true
	});
	exports.default = { DATABASE_URL: process.env.DATABASE_URL || global.DATABASE_URL || (process.env.NODE_ENV === 'production' ? 'mongodb://test:test@ds047666.mlab.com:47666/xml2json-mlab' : 'mongodb://localhost/worthysum-dev'),
	     PORT: process.env.PORT || 3001
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ])));
//# sourceMappingURL=server.js.map