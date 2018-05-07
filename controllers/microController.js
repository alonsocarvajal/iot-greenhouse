/*

{'name': 'casa1','_sensorId': '5a32dc4d734d1d293237ef2f','location': '[2,2]','type': 'madera'}

*/

var MicroController = require('../models/microcontroller');

// Display all microcontrollers
exports.microcontroller_list = function(req, res, next) {
    MicroController.find({})
    //.populate('microcontroller')
    .exec(function (err, list_microcontrollers) {
        if (err) { return next(err); }
        // Successful
        res.json(list_microcontrollers);
    });
};

// Handle a create microcontroller on POST
exports.microcontroller_create_post = function(req, res, next) {
    // Check fields
    console.log(req.body);
    req.checkBody('model', 'Model required').notEmpty();
    req.checkBody('mac', 'MAC required').notEmpty();
    req.checkBody('version', 'Version required').notEmpty();

    // Run validators
    var errors =  req.validationErrors();

    // Create microcontroller object
    var microcontroller = new MicroController(
        {
            model: req.body.model,
            mac: req.body.mac,
            version: req.body.version,
            description: req.body.description,
            _greenhouseId: req.body._greenhouseId
        }
    );

    if (errors) {
        res.json( {status: 'Validation Error: ' + errors} );
        return;
    }
    else {
        // Data is valid
        MicroController.findOne( {'mac': req.body.mac} )
            .exec( function(err, found_microcontroller) {
                console.log('found_microcontroller: ' + found_microcontroller);
                if (err) { return next(err); }
                if (found_microcontroller) {
                    res.json( {'status': 'Microcontroller already exists'} );
                }
                else {
                    microcontroller.save( function(err) {
                        if (err) { return next(err); }
                        res.json( {'status': 'Microcontroller was created with successful'} );
                    });
                }
            });
    }
};

// Handle a delete microcontroller on POST
exports.microcontroller_delete_post = (req, res) => {
    req.checkBody('id', 'Microcontroller ID is required').notEmpty();
    
    MicroController.findById(req.body.id)
        .exec( (err, results) => {
            if (err) { return next(err); }
            if (results.length < 1) {
                res.json( {'status': 'Microcontroller ID does not exists'} )
                return;
            }
            else {
                MicroController.findByIdAndRemove(req.body.id, function deleteMicroController(err){
                    if (err) { return next(err); }
                    res.json( {'status':'Microcontroller was removed with successful'} );
                });
            }
        })

};

// Handle a update microcontroller on POST
exports.microcontroller_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: microcontroller_update_post'); 
};