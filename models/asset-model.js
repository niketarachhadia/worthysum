import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
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



const Asset = mongoose.model('Asset', AssetSchema);

export default AssetSchema;