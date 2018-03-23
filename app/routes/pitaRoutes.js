const express = require('express');
const router = express.Router();

const {
		new_report,
    list_reports, 
    report_details, 
    report_create_post, 
    delete_report, 
    update_report,
    load_user_reports } = require('../controllers/reportsController.js');

router.get('/new', new_report);
router.get('/list', list_reports);
router.post('/create', report_create_post);
router.get('/report/:id', report_details);
router.delete('/report/delete/:id', delete_report);
router.put('/report/:id', update_report);
router.get('/user/:id', load_user_reports);

module.exports = router;