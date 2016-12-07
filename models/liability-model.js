import mongoose from 'mongoose';

const LiabilitySchema = new mongoose.Schema({
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
        unique: false
    }
});



const Liability = mongoose.model('Liability', LiabilitySchema);

export default LiabilitySchema;