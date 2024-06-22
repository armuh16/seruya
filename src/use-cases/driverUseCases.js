const driverRepository = require('../repositories/driverRepository');

async function addDriver(driver) {
    const existingDriver = await driverRepository.driverExists(driver.driver_code);
    if (existingDriver) {
        throw new Error('Driver with this code already exists');
    }
    const newDriver = await driverRepository.createDriver(driver);
    return newDriver;
}

async function getDrivers() {
    const drivers = await driverRepository.getAllDrivers();
    return drivers;
}

module.exports = {
    addDriver,
    getDrivers,
};
