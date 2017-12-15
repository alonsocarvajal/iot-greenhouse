var mongoose = require('mongoose');
var moment = require('moment-timezone');


var Schema = mongoose.Schema;

var RecordSchema = new Schema(
    {
        date: {type: Date, default: moment().tz("America/Santiago").format()},
        _sensorId: {type: Schema.Types.ObjectId, required: true},        
        temperature: {type: Number, required: true},
        humidity: {type: Number, required: true}
    }
);

// Export model
module.exports = mongoose.model('Record', RecordSchema);