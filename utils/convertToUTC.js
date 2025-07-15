module.exports = function convertToUTCFromIST(dateStr) {
  const istDate = new Date(`${dateStr}T00:00:00+05:30`);
  return new Date(istDate.toUTCString());
}
