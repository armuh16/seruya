const attendanceRepository = require('../repositories/attendanceRepository');

async function addAttendance(attendance) {
    const existingAttendance = await attendanceRepository.attendanceExists(attendance.driver_code, attendance.attendance_date);
    if (existingAttendance) {
        throw new Error('Attendance record already exists');
    }
    const newAttendance = await attendanceRepository.createAttendance(attendance);
    return newAttendance;
}

async function getAttendances() {
    const attendances = await attendanceRepository.getAllAttendances();
    return attendances;
}

module.exports = {
    addAttendance,
    getAttendances,
};
