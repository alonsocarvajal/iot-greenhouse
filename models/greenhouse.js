var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GreenhouseSchema = new Schema(
    {
        name: {type: String, required: true},        
        location: {type: [], required: true},
        type: {type: String, required: true},
        image: {type: String}
    }
);

// Export model
module.exports = mongoose.model('Greenhouse', GreenhouseSchema);