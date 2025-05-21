const express = require('express');
const router = express.Router();
const controllerTask = require('../Controllers/controllerTask');

router.get('/', controllerTask.GetAllTasks);
router.get('/add', controllerTask.Displaying_form_to_add_task);
router.post('/add', validateTaskBeforeAdd, controllerTask.addTask);
router.put('/:id', validateTaskBeforeUpdate, controllerTask.Marking_task_done);
router.delete('/:id', controllerTask.deleteTask);

function validateTaskBeforeAdd(req, res, next) {
    const { title } = req.body;
    if (!title || title.trim() === "") {
        return res.render('message_display', {
            Message: "Title cannot be empty.",
            MessageType: "error"

        });      
    }
    next();
}

function validateTaskBeforeUpdate(req, res, next) {
    const { id } = req.body;
    if (id && isNaN(id)) {
        return res.status(400).json({ error: "ID must be a number." });
    }
    next();
}
module.exports = router;
