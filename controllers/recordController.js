var Record = require('../models/record');

// Display all greenhouses
exports.record_list = function(req, res, next) {
    Record.find({})
    .exec(function (err, list_records) {
        if (err) { return next(err); }
        // Successful
        res.json(list_records);
    }); 
};

/*
        date: {type: Date, default: Date.now},
        _sensorId: {type: Schema.Types.ObjectId, required: true},        
        temperature: {type: Number, required: true},
        humidity: {type: Number, required: true}
*/

// Handle a create record on POST
exports.record_create_post = function(req, res, next) {
    // Check fields
    console.log(req.body);
    req.checkBody('_sensorId', 'Sensor ID required').notEmpty();
    req.checkBody('data', 'Data required').notEmpty();

    // Run validators
    var errors =  req.validationErrors();

    // Create greenhouse object
    var record = new Record(
        {
            _sensorId: req.body._sensorId,
            data: req.body.data
        }
    );

    if (errors) {
        res.json( {status: 'Validation Error: ' + errors} );
        return;
    }
    else {
        // Data is valid
        record.save( function(err) {
            if (err) { return next(err); }
            res.json( {'status': 'Record was created with successful'} );
        });
    }
};
