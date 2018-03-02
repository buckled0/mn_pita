var report_controller = require('../controllers/reports_controller.js');
var express = require('express');
var router = express.Router();

router.get('/pita/:id', report_controller.report_details);

router.post('/pita', report_controller.report_create_post);

router.delete('/pita/:id', report_controller.delete_report);

router.put('/pita/:id', report_controller.update_report);

module.exports = router;