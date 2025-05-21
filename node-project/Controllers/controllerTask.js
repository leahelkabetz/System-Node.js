const modelTask = require('../Models/modelTask');

const taskEmitter = require('../Services/events_manager');

exports.Displaying_form_to_add_task = (req, res) => {
    res.render('create_task');
};

exports.addTask = (req, res) => {
    const { title } = req.body;
    modelTask.addTask(title, (err, result) => {
        if (err) {
            console.error(err);
            return res.render('message_display', {
                Message: "Error creating the task.",
                MessageType: "error"
            });
        }
        taskEmitter.emit('taskAdded', { id: result.insertId, title, status: 'incomplete' });
        res.render('message_display', {
            Message: "The task was created successfully.",
            MessageType: "success"
        });
    });
};

exports.Marking_task_done = (req, res) => {
    const { id } = req.params;
    modelTask.getTaskById(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.render('message_display', {
                Message: "Error retrieving task details before deletion.",
                MessageType: "error"
            });
        }
        const { title } = result;
        modelTask.Marking_task_done(id, (err, result) => {
            if (err) {
                console.error(err);
                return res.render('message_display', {
                    Message: "Error updating task status.",
                    MessageType: "error"
                });
            }
            taskEmitter.emit('taskUpdated', { id, title, status: 'Completed' });
            return res.render('message_display', {
                Message: "Task marked as completed successfully!",
                MessageType: "success"
            });
        });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    modelTask.getTaskById(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.render('message_display', {
                Message: "Error retrieving task details before deletion.",
                MessageType: "error"
            });
        }
        const { title, status } = result;
        modelTask.deleteTask(id, (err, result) => {
            if (err) {
                console.error(err);
                return res.render('message_display', {
                    Message: "Error deleting task.",
                    MessageType: "error"
                });
            }
            taskEmitter.emit('taskDeleted', { id, title, status });
            return res.render('message_display', {
                Message: "Task deleted successfully!",
                MessageType: "success"
            });
        });
    });
};

exports.GetAllTasks = (req, res) => {
    modelTask.GetAllTasks((err, result) => {
        if (err) {
            console.error(err);
            return res.render('message_display', {
                Message: "Error displaying tasks.",
                MessageType: "error"
            });
        }
        res.render('get_all_tasks', { tasks: result });
    });
};
