module.exports = function convertToUTCFromIST(dateStr) {
  // Expecting dateStr in 'DD-MM-YYYY' format
  const [day, month, year] = dateStr.split('-').map(Number);
  // Create date in IST timezone
  const istDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  // Adjust for IST offset (+5:30)
  istDate.setUTCHours(istDate.getUTCHours() - 5, istDate.getUTCMinutes() - 30);
  return new Date(istDate.toUTCString());
}
