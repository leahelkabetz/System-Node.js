const express = require('express');

const tasks = require('./Routers/routerTasks');
const logs=require('./Routers/routerLog')

const PORT=process.env.PORT||3000
const app=express();
const methodOverride = require('method-override');
require('dotenv').config();

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tasks', tasks);
app.use('/logs', logs);

app.listen(PORT, function () {
    console.log(`Example app listening on port http://localhost:${PORT}/ !`);
  });


