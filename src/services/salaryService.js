const salaryRepository = require('../repositories/salaryRepository');

async function getDriverSalaries(month, year, current, page_size) {
    const offset = (current - 1) * page_size;
    const data = await salaryRepository.fetchDriverSalaries(month, year, offset, page_size);
    const total_row = await salaryRepository.countDriverSalaries(month, year);

    return {
        data,
        total_row,
        current: parseInt(current),
        page_size: parseInt(page_size)
    };
}

module.exports = {
    getDriverSalaries,
};
