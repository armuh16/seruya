const driverRepository = require('../repositories/driverRepository');

async function addDriver(driver) {
    const newDriver = await driverRepository.createDriver(driver);
    if (!newDriver) {
        throw new Error('Driver with this code already exists');
    }
    return newDriver;
}

module.exports = {
    addDriver,
};
