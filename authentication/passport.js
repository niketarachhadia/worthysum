import passport from 'passport';
import pHttp from 'passport-http';
import pLocal from 'passport-local';
import User from '../models/user-model';
const BasicStrategy=pHttp.BasicStrategy;
const LocalStrategy=pLocal.Strategy;

const strategy = new LocalStrategy('local',
  (username, password, done) =>{
    User.findOne({ username: username },  (err, user)=> {
      if (err) { return done(err); }
      if (!user) { return done('{"error":"User does not exist"}', false); }
      user.validatePassword(password,(err,isValid)=>{
		  if(err!==null || !isValid){
			  return done('{"error":"Invalid Password"}', false);
		  }
			return done(null, user);
	  })
      
    });
  }
);
 passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

passport.use(strategy);
export default passport;