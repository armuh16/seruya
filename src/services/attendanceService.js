const attendanceRepository = require('../repositories/attendanceRepository');

async function addAttendance(attendance) {
    const newAttendance = await attendanceRepository.createAttendance(attendance);
    if (!newAttendance) {
        throw new Error('Attendance record already exists');
    }
    return newAttendance;
}

module.exports = {
    addAttendance,
};
