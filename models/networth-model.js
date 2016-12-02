import mongoose from 'mongoose';
import LiabilitySchema from './liability-model'
import AssetSchema from './asset-model'
import StatsSchema from './stats-model'
const NetworthSchema = new mongoose.Schema({
	liabilities: [LiabilitySchema],
	assets: [AssetSchema],
	stats: [StatsSchema]
});



const Networth = mongoose.model('Networth', NetworthSchema);

export default NetworthSchema;