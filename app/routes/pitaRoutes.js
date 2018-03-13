const express = require('express');
const router = express.Router();

const {
    list_reports, 
    report_details, 
    report_create_post, 
    delete_report, 
    update_report } = require('../controllers/reportsController.js');

router.get('/', list_reports);
router.post('/', report_create_post);
router.get('/:id', report_details);
router.delete('/:id', delete_report);
router.put('/:id', update_report);

module.exports = router;