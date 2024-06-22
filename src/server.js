const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const salaryRoutes = require('./routes/salaryRoutes');
const driverRoutes = require('./routes/driverRoutes');
const attendenceRoutes = require('./routes/attendanceRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const shipmentCostRoutes = require('./routes/shipmentCostRoutes');

// Middleware
app.use(express.json());
app.use('/api', salaryRoutes);
app.use('/api', driverRoutes);
app.use('/api', attendenceRoutes);
app.use('/api', shipmentRoutes);
app.use('/api', shipmentCostRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


