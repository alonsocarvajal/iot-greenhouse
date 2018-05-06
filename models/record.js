var mongoose = require('mongoose');
var moment = require('moment-timezone');

//moment('2014-05-18T21:30:00.000Z').tz('America/New_York');

var Schema = mongoose.Schema;

var RecordSchema = new Schema(
    {
        date: {type: Date, default: Date.now},        
        temperature: {type: Number, required: true},
        humidity: {type: Number, required: true},
        _sensorId: {type: Schema.Types.ObjectId, required: true}
    }
);

// Export model
module.exports = mongoose.model('Record', RecordSchema);