/*

{'name': 'casa1','_sensorId': '5a32dc4d734d1d293237ef2f','location': '[2,2]','type': 'madera'}

*/

const Greenhouse = require('../models/greenhouse');
const Record = require('../models/record');
const ChartOption = require('../helpers/graph_config.json');

// Index
exports.index = function(req, res) {
    const chartOptions = ChartOption;
    
    Record.find({}).sort({'date': -1})
    .exec( (err, records) => {
        if (err) { return next(err); }
        
        const dates = records.map(record => record.date);
        const temperatures = records.map(record => record.data[0]);
        console.log(dates);
        const humidities = records.map(record => record.data[1])
        let lastData = {
                date: dates[0],
                temperature: temperatures[0],
                humidity: humidities[0]
        }
        console.log(chartOptions);
        chartOptions.xAxis[0].data = dates;
        chartOptions.series[0].data = temperatures;
        res.render( 'index', {title: 'Dashboard', data: JSON.stringify(chartOptions), lastData: lastData} );
    });
    
};

// Display all greenhouses
exports.greenhouse_list = function(req, res, next) {
    Greenhouse.find({})
    .populate('microController')
    .exec(function (err, list_greenhouses) {
        if (err) { return next(err); }
        // Successful
        res.json(list_greenhouses);
    });
};

// Handle a create greenhouse on POST
exports.greenhouse_create_post = function(req, res, next) {
    // Check fields
    console.log(req.body);
    req.checkBody('name', 'Name required').notEmpty();
    req.checkBody('description', 'Description required').notEmpty();
    req.checkBody('location', 'Location required').notEmpty();

    //req.checkBody('image', 'Image required').notEmpty();

    // Run validators
    var errors =  req.validationErrors();

    // Create greenhouse object
    var greenhouse = new Greenhouse(
        {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            image: req.body.image
        }
    );

    if (errors) {
        res.json( {status: 'Validation Error: ' + errors} );
        return;
    }
    else {
        // Data is valid
        Greenhouse.findOne( {'name': req.body.name} )
            .exec( function(err, found_greenhouse) {
                console.log('found_greenhouse: ' + found_greenhouse);
                if (err) { return next(err); }
                if (found_greenhouse) {
                    res.json( {'status': 'Greenhouse already exists'} );
                }
                else {
                    greenhouse.save( function(err) {
                        if (err) { return next(err); }
                        res.json( {'status': 'Greenhouse was created with successful'} );
                    });
                }
            });
    }
};

// Handle a delete greenhouse on POST
exports.greenhouse_delete_post = (req, res) => {
    req.checkBody('id', 'Greenhouse ID is required').notEmpty();
    
    Greenhouse.findById(req.body.id)
        .exec( (err, results) => {
            if (err) { return next(err); }
            if (results.length < 1) {
                res.json( {'status': 'Greenhouse ID does not exists'} )
                return;
            }
            else {
                Greenhouse.findByIdAndRemove(req.body.id, function deleteGreenhouse(err){
                    if (err) { return next(err); }
                    res.json( {'status':'Greenhouse was removed with successful'} );
                });
            }
        })

};

// Handle a update greenhouse on POST
exports.greenhouse_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: greenhouse_update_post'); 
};