exports = module.exports = function(app, mongoose) {

	var eventSchema = new mongoose.Schema({
		date: 		{ type: Number },
		time: 		{ type: Number },
		desc: 		{ type: Number },
		category: 		{
			type: String,
			enum: ['info', 'Error', 'Warning']
		},
		summary: 	{ type: String }
	});

	mongoose.model('Event', eventSchema);

};