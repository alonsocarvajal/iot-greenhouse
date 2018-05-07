/*
var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/

var express = require('express');
var router = express.Router();

// Require controllers modules
var greenhouse_controller = require('../controllers/greenhouseController');
var micro_controller = require('../controllers/microController');
var sensor_controller = require('../controllers/sensorController');
var record_controller = require('../controllers/recordController');

/// GREENHOUSE ROUTES ///

router.get('/', greenhouse_controller.index);
router.get('/greenhouses', greenhouse_controller.greenhouse_list);
router.post('/greenhouse/create', greenhouse_controller.greenhouse_create_post);
router.post('/greenhouse/:id/delete', greenhouse_controller.greenhouse_delete_post);
router.post('/greenhouse/:id/update', greenhouse_controller.greenhouse_update_post);

/// MICROCONTROLLER ROUTES///
router.get('/microcontrollers', micro_controller.microcontroller_list);
router.post('/microcontroller/create', micro_controller.microcontroller_create_post);
router.post('/microcontroller/:id/delete', micro_controller.microcontroller_delete_post);
router.post('/microcontroller/:id/update', micro_controller.microcontroller_update_post);
/// SENSOR ROUTES ///

router.get('/sensors', sensor_controller.sensor_list);
router.post('/sensor/create', sensor_controller.sensor_create_post);
router.post('/sensor/:id/delete', sensor_controller.sensor_delete_post);
router.post('/sensor/:id/update', sensor_controller.sensor_update_post);

/// RECORD ROUTES ///

router.get('/records', record_controller.record_list);
router.post('/record/create', record_controller.record_create_post);

module.exports = router;
