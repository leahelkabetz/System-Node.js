const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../logs.txt'); 

exports.writeLog = (message) => {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logPath, logMessage);
};

exports.getLogs = () => {
    if (!fs.existsSync(logPath)) {
        throw new Error('Log file not found');
    }
    return fs.readFileSync(logPath, 'utf-8'); 
};

exports.deleteLogFile = () => {
    if (!fs.existsSync(logPath)) {
        throw new Error('Log file not found');
    }
    fs.unlinkSync(logPath); 
};


