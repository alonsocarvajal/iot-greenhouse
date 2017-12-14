var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = new Schema(
    {
        date: {type: Date, default: Date.now},
        _sensorId: {type: Schema.Types.ObjectId, required: true},        
        temperature: {type: Number, required: true},
        humidity: {type: Number, required: true}
    }
);

// Export model
module.exports = mongoose.model('Record', RecordSchema);