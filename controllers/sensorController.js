var Sensor = require('../models/sensor');

// Display all sensor
exports.sensor_list = function(req, res) {
    Sensor.find({})
    .exec(function (err, list_sensors) {
        if (err) { return next(err); }
        // Successful
        res.json(list_sensors);
    });
};

// Handle a create sensor on POST
exports.sensor_create_post = function(req, res) {
    // Check fields
    req.checkBody('model', 'Model required').notEmpty();
    req.checkBody('description', 'Description required').notEmpty();    

    // Run validators
    var errors =  req.validationErrors();

    // Create greenhouse object
    var sensor = new Sensor(
        {
            model: req.body.model,
            description: req.body.description,
            _microControllerId: req.body._microControllerId
        }
    );

    if (errors) {
        res.json( {status: 'Validation Error: ' + errors} );
        return;
    }
    else {
        // Data is valid
        sensor.save( function(err) {
            if (err) { return next(err); }
            res.json( {'status': 'Sensor was created with successful'} );
        });
    }
};

// Handle a delete sensor on POST
exports.sensor_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: sensor_delete_post'); 
};

// Handle a update sensor on POST
exports.sensor_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: sensor_update_post'); 
};