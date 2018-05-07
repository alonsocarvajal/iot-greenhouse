var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MicroControllerSchema = new Schema(
    {
        model: {type: String, required: true},
        mac: String,
        version: {type: String, required: true},
        description: String,
        _greenhouseId: {type: Schema.Types.ObjectId, required: true}
    }
);

// Export model
module.exports = mongoose.model('MicroController', MicroControllerSchema);