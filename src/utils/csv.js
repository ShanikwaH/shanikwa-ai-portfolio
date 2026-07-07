export const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());

  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    const row = {};
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      const numValue = parseFloat(value);
      row[header] = !isNaN(numValue) && isFinite(numValue) ? numValue : value;
    });
    return row;
  }).filter(row => Object.values(row).some(value => value !== null && value !== '' && value !== undefined));

  return { data, headers };
};

export const toCSV = (rows) => {
  return [
    Object.keys(rows[0]).join(','),
    ...rows.map(row => Object.values(row).join(','))
  ].join('\n');
};
