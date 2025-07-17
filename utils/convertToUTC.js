// utils/convertToUTC.js
module.exports = function convertToUTCFromIST(dateStr) {
  try {
    const [day, month, year] = dateStr.split('-').map(Number);
    const localDate = new Date(Date.UTC(year, month - 1, day));
    return localDate;
  } catch (error) {
    console.error('Date Conversion Failed:', error);
    return new Date('Invalid Date'); // This will trigger validation error
  }
};
