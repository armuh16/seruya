const salaryRepository = require('../repositories/salaryRepository');

async function calculateDriverSalaries(month, year, current, page_size) {
    const offset = (current - 1) * page_size;
    const salaries = await salaryRepository.fetchDriverSalaries(month, year, offset, page_size);
    const totalCount = await salaryRepository.countDriverSalaries(month, year);

    return {
        data: salaries,
        total_row: totalCount,
        current: parseInt(current, 10),
        page_size: parseInt(page_size, 10),
    };
}

module.exports = {
    calculateDriverSalaries,
};
