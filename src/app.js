const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const salaryRoutes = require('./routes/salaryRoutes');
const driverRoutes = require('./routes/driverRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const shipmentCostRoutes = require('./routes/shipmentCostRoutes');

app.use(bodyParser.json());
app.use('/api', salaryRoutes);
app.use('/api', driverRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', shipmentRoutes);
app.use('/api', shipmentCostRoutes);

app.use(express.static('src/frontend/public'));

module.exports = app;
