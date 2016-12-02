import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import NetworthSchema from './networth-model'

const UserSchema = new mongoose.Schema({
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
	currentNetworth:[NetworthSchema],
	netWorth:[{
		year:Number,
		month:Number,
		details:[NetworthSchema]
	}]
});

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

const User = mongoose.model('User', UserSchema);

export default User;