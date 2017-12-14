var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SensorSchema = new Schema(
    {
        model: {type: String, required: true},
        description: {type: String}
    }
);

// Export model
module.exports = mongoose.model('Sensor', SensorSchema);