var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GreenhouseSchema = new Schema(
    {
        name: {type: String, required: true},
        _sensorId: {type: Schema.Types.ObjectId, required: true},        
        location: {type: [], required: true},
        type: {type: String, required: true},
        image: {type: String}
    }
);

// Export model
module.exports = mongoose.model('Greenhouse', GreenhouseSchema);