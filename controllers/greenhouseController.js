/*

{'name': 'casa1','_sensorId': '5a32dc4d734d1d293237ef2f','location': '[2,2]','type': 'madera'}

*/

var Greenhouse = require('../models/greenhouse');
var Record = require('../models/record');

// Index
exports.index = function(req, res) {
    const chartOptions = {
        title : {
            text: 'Temperatura y Humedad',
            subtext: 'Actualización cada 12 segundos'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['Tº']
        },
        toolbox: {
            show : false
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['cat1','cat2','cat3','cat4']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'#responses',
                type:'line',
                data:[2.0, 4.9, 7.0, 23.2],
                markPoint : {
                    data : [
                        {type : 'max', name: 'Valor máximo'},
                        {type : 'min', name: 'Valor mínimo'}
                    ]
                }//,
                //markLine : {
                //    data : [
                //       {type: 'average', name: 'average'}
                //    ]
                //}
            }
        ]
    }// end charOptions

    Record.find({})
    .exec( (err, records) => {
        if (err) { return next(err); }
        const dates = records.map(record => record.date);
        const temperatures = records.map(record => record.temperature).sort( (a,b) => b - a );
        console.log(temperatures);
        const humidities = records.map(record => record.humidity)
        let lastTemperature = temperatures[temperatures.length - 1];
        chartOptions.xAxis[0].data = dates;
        chartOptions.series[0].data = temperatures;
        res.render( 'index', {title: 'Dashboard', data: JSON.stringify(chartOptions), lastTemperature: lastTemperature} );
    });
    
};

// Display all greenhouses
exports.greenhouse_list = function(req, res, next) {
    Greenhouse.find({})
    .populate('sensor')
    .exec(function (err, list_greenhouses) {
        if (err) { return next(err); }
        // Successful
        res.json(list_greenhouses);
    });
};

// Handle a create greenhouse on POST
exports.greenhouse_create_post = function(req, res, next) {
    // Check fields
    console.log(req.body.name);
    req.checkBody('name', 'Name required').notEmpty();
    req.checkBody('_sensorId', 'Sensor required').notEmpty();    
    req.checkBody('location', 'Location required').notEmpty();
    req.checkBody('type', 'Type required').notEmpty();
    //req.checkBody('image', 'Image required').notEmpty();

    // Run validators
    var errors =  req.validationErrors();

    // Create greenhouse object
    var greenhouse = new Greenhouse(
        {
            name: req.body.name,
            _sensorId: req.body._sensorId,
            location: req.body.location,
            type: req.body.type,
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
exports.greenhouse_delete_post = function(req, res) {
    req.checkBody('id', 'Greenhouse ID is required').notEmpty();
    
    Greenhouse.findById(req.body.id)
        .exec(function (err, results) {
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