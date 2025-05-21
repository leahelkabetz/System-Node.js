const modelLog = require('../Models/modelLog');

exports.getLogs = (req, res) => {
    try {
        const logLines = modelLog.getLogs(); 
        res.render('logDisplay', { logLines });
    } catch (error) {
        console.error('Error reading log file:', error.message);
        return res.render('message_display', {
            Message: `Error reading log file: ${error.message}`,
            MessageType: "error"
        });
    }
};

exports.deleteLogFile = (req, res) => {
    try {
        modelLog.deleteLogFile();
        return res.render('message_display', {
            Message: "Log file deleted successfully!",
            MessageType: "success"
        });
    } catch (error) {
        console.error('Error deleting log file:', error.message);
        return res.render('message_display', {
            Message: `Error deleting log file: ${error.message}`,
            MessageType: "error"
        });
    }      
};
