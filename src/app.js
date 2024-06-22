const express = require('express');
const app = express();
const salaryRoutes = require('./routes/salaryRoutes');

app.use(express.json());
app.use('/api', salaryRoutes);

module.exports = app;
