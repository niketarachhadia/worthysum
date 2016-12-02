import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
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



const Stats = mongoose.model('Stats', StatsSchema);

export default StatsSchema;