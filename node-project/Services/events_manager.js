const modelLog = require('../Models/modelLog');

const EventEmitter = require('events');
const taskEmitter = new EventEmitter();

taskEmitter.on('taskAdded', (task) => {
    modelLog.writeLog(`Added Task: { ID: ${task.id}, Title: ${task.title}, Status: ${task.status}}`);
});

taskEmitter.on('taskUpdated', (task) => {
    modelLog.writeLog(`Updated Task: { ID: ${task.id}, Title: ${task.title}, Status: ${task.status}}`);
});

taskEmitter.on('taskDeleted', (task) => {
    modelLog.writeLog(`Deleted Task: { ID: ${task.id}, Title: ${task.title}, Status: ${task.status}}`);
});

module.exports=taskEmitter;