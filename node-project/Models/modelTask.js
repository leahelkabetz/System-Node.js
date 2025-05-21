const db = require('../DB/config');

exports.addTask=(title,callback)=>{
    const query='INSERT INTO Tasks (title,status) VALUES ( ?, ?)';
    db.query(query,[title,'incomplete'],callback);
}
exports.Marking_task_done=(id,callback)=>{
    const query=`UPDATE Tasks
                 SET status = 'completed'
                 WHERE Tasks.id = ?`;
    db.query(query, [id], callback);
}
exports.deleteTask=(id,callback)=>{
  const query = 'DELETE FROM Tasks WHERE id = ?';
  db.query(query, [id], callback);
}
exports.GetAllTasks=(callback)=>{
    const query = 'SELECT * FROM Tasks'
    db.query(query,callback);
}

exports.getTaskById = (id, callback) => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return callback(err, null);
        }
        
        if (results.length === 0) {
            console.log('No task found with ID: ', id);
            return callback(null, null); 
        }
        
        console.log('Task found: ', results[0]);
        callback(null, results[0]);  
    });
};