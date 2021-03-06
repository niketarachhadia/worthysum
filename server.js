import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

import User from './models/user-model';
import passport from './authentication/passport';
import config from './config';

let server;
function runServer(callback){
	console.log('DEBUG DEBUG connect to db: ' + config.DATABASE_URL);
	mongoose.connect(config.DATABASE_URL, (err)=>{
		if(err && callback){
			return callback(err);
		}
		console.log('Debug debug port from environmet: '+process.env.PORT);
		server=app.listen(config.PORT, ()=>{
			console.log('Listening on localhost:' + config.PORT);
			if(callback){ 
				callback();
			}
		});	
	});
};

if(require.main === module){
	runServer((err)=>{
		if(err){
			console.error(err);
		}
	});
};

let app = express();
let jsonParser = bodyParser.json();
let urlParser=bodyParser.urlencoded({
	extended:true
});
app.use(jsonParser);
app.use(urlParser);
app.use(passport.initialize());
app.use(express.static('client/build'));
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error('DEBUG DEBUG error handling: '+err);
  res.status(500).send({status:500, error: err, type:'internal'});
});
app.post('/login', passport.authenticate('local',{ failWithError: true }),
	function(req, res) {
		let username = req.body.username;
		User.findOne({ username: username },  (err, user)=> {
			console.log("DEBUG login user found: "+JSON.stringify(user));
			return res.status(201).json(user);
		});		
	  },
	function(err, req, res, next) {
		return res.json(err); 
	  }
);

app.post('/users',  (req, res)=>{
    if (!req.body) {
        return res.json('{"error":"Invalid Request"}');
    }
	
    if (!('username' in req.body)) {
        return res.json('{"error":"Email is required"}');
    }

    let username = req.body.username;
    if (typeof username !== 'string') {
        return res.json('{"error":"Invalid Email"}');
    }

    username = username.trim();

    if (username === '') {
        return res.json('{"error":"Invalid Email"}');
    }

    if (!('password' in req.body)) {
        return res.json('{"error":"Missing Password"}');
    }
	
    let password = req.body.password;
    if (typeof password !== 'string') {
        return res.json('{"error":"Invalid Password"}');
    }

    password = password.trim();

    if (password === '') {
        return res.json('{"error":"Invalid Password"}');
    }

	bcrypt.genSalt(10, (err, salt)=> {
        if (err) {
			console.error('Encryption Error: '+err);
            return res.json('{"error":"Server Error. Notify your administrator to verify logs"}');
        }
		bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
				console.error('Encryption Error: '+err);
                return res.json('{"error":"Server Error. Notify your administrator to verify logs"}');
            }
			let firstname = req.body.firstname;
			let lastname = req.body.lastname;
			
			let initialNetworth=[{
				assets:[{
					type:"",
					description:"",
					net_value:0,
					index:0
				}],
				liabilities:[{
					type:"",
					description:"",
					remaining_amount:0,
					index:0
				}],
				stats:[{
					net:0,
					totalDebt:0,
					totalAssets:0
				}]
			}]
			let user = new User({
				username: username,
				password: hash,
				firstname: firstname,
				lastname: lastname,
				currentNetworth:initialNetworth,
				netWorth:[{
					year:new Date().getUTCFullYear(),
					month:new Date().getUTCMonth(),
					details:initialNetworth
				}]
			});
			user.save((err)=>{
				if (err) {
					return res.json('{"error":"User already exists"}');
				}
				return res.status(201).json(user);
			});			
		});		
	});
     
    
});

app.put('/liability',  (req, res)=>{
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }
	let username = req.body.username;
	let liabilityIndex = req.body.liabilityIndex;
	let fieldName=req.body.fieldName;
	let fieldValue=req.body.fieldValue;
	User.findOne({ username: username },  (err, user)=> {
		
		if(user.currentNetworth[0].liabilities.length>liabilityIndex){
			let liability=user.currentNetworth[0].liabilities[liabilityIndex];
			liability[fieldName]=fieldValue;
		}
		
		let lastLiability=user.currentNetworth[0].liabilities[user.currentNetworth[0].liabilities.length-1];
		if(lastLiability.type!='' || lastLiability.description!='' || lastLiability.remaining_amount!=0){
			user.currentNetworth[0].liabilities.push(
				{
					type:"",
					description:"",
					remaining_amount:0,
					index:lastLiability.index+1
				}
			);
		}
		user.save();
		return res.status(200).json(user);
		
		
	});
});
app.delete('/liability',  (req, res)=>{
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }
	let username = req.body.username;
	let liabilityIndex = req.body.liabilityIndex;
	User.findOne({ username: username },  (err, user)=> {
		if(user.currentNetworth[0].liabilities.length>liabilityIndex){
			let liability=user.currentNetworth[0].liabilities[liabilityIndex];
			liability.remove();
		}
		let emptyLiability={
					type:"",
					description:"",
					remaining_amount:0
				}
		if(user.currentNetworth[0].liabilities.length==0){
			emptyLiability.index=0;
			user.currentNetworth[0].liabilities.push(emptyLiability);
		} else {
			let lastLiability=user.currentNetworth[0].liabilities[user.currentNetworth[0].liabilities.length-1];
			if(lastLiability.type!='' || lastLiability.description!='' || lastLiability.remaining_amount!=0){
				emptyLiability.index=lastLiability.index+1;
				user.currentNetworth[0].liabilities.push(emptyLiability);
			}
		}
		user.save();
		return res.status(200).json(user);
		
		
	});
});
app.put('/asset',  (req, res)=>{
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }
	let username = req.body.username;
	let assetIndex = req.body.assetIndex;
	let fieldName=req.body.fieldName;
	let fieldValue=req.body.fieldValue;
	User.findOne({ username: username },  (err, user)=> {
		
		if(user.currentNetworth[0].assets.length>assetIndex){
			let asset=user.currentNetworth[0].assets[assetIndex];
			asset[fieldName]=fieldValue;
		}
		
		let lastAsset=user.currentNetworth[0].assets[user.currentNetworth[0].assets.length-1];
		if(lastAsset.type!='' || lastAsset.description!='' || lastAsset.net_value!=0){
			user.currentNetworth[0].assets.push(
				{
					type:"",
					description:"",
					net_value:0,
					index:lastAsset.index+1
				}
			);
		}
		user.save();
		return res.status(200).json(user);
		
		
	});
});
app.delete('/asset',  (req, res)=>{
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }
	let username = req.body.username;
	let assetIndex = req.body.assetIndex;
	User.findOne({ username: username },  (err, user)=> {
		if(user.currentNetworth[0].assets.length>assetIndex){
			let asset=user.currentNetworth[0].assets[assetIndex];
			asset.remove();
		}
		let emptyAsset={
					type:"",
					description:"",
					net_value:0
				}
		if(user.currentNetworth[0].assets.length==0){
			emptyAsset.index=0;
			user.currentNetworth[0].assets.push(emptyAsset);
		} else {
			let lastAsset=user.currentNetworth[0].assets[user.currentNetworth[0].assets.length-1];
			if(lastAsset.type!='' || lastAsset.description!='' || lastAsset.net_value!=0){
				emptyAsset.index=lastAsset.index+1;
				user.currentNetworth[0].assets.push(emptyAsset);
			}
		}
		user.save();
		return res.status(200).json(user);
		
		
	});
});

export default app;