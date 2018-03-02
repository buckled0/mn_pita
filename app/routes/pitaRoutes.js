var report_controller = require('../controllers/reportsController.js');
var express = require('express');
var router = express.Router();

router.get('/', report_controller.list_reports);

router.get('/:id', report_controller.report_details);

router.post('/new', report_controller.report_create_post);

router.delete('/:id', report_controller.delete_report);

router.put('/:id', report_controller.update_report);

module.exports = router;