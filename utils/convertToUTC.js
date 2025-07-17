module.exports = function convertToUTCFromIST(dateStr) {
  try {
    // Expecting 'DD-MM-YYYY'
    const [day, month, year] = dateStr.split('-').map(Number);

    if (!day || !month || !year || day > 31 || month > 12 || year < 1900) {
      throw new Error('Invalid date format. Expected DD-MM-YYYY');
    }

    // Convert to Date object (IST)
    const istDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    
    // Adjust IST (+5:30) to get UTC
    istDate.setUTCHours(istDate.getUTCHours() - 5, istDate.getUTCMinutes() - 30);

    const utcDate = new Date(istDate.toUTCString());

    if (isNaN(utcDate.getTime())) {
      throw new Error('Invalid Date object');
    }

    return utcDate;

  } catch (err) {
    console.error('❌ Error in convertToUTC:', err.message);
    throw err;
  }
};
