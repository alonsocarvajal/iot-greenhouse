import { version } from 'moment';

var mogoose = require('mongoose');

var Schema = new Schema(
    {
        model: {type: String, required: true},
        version: {type: String, required: true},
        description: String,
        _greehouseId: {type: Schema.Types.ObjectId, required: true},
    }
);