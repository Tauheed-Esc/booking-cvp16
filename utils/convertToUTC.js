module.exports = function convertToUTCFromIST(dateStr) {
  try {
    // Expecting dateStr in 'DD-MM-YYYY'
    const [day, month, year] = dateStr.split('-').map(Number);

    if (!day || !month || !year) {
      throw new Error("Invalid date format");
    }

    const istDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    istDate.setUTCHours(istDate.getUTCHours() - 5, istDate.getUTCMinutes() - 30);

    return new Date(istDate.toUTCString());
  } catch (err) {
    console.error(" Error in convertToUTC:", err.message);
    throw err;
  }
};
