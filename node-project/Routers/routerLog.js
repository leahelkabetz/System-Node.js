const express = require('express');
const router = express.Router();
const logController = require('../Controllers/controllerLog'); 

router.get('/', logController.getLogs);
router.delete('/', logController.deleteLogFile);

module.exports = router;
