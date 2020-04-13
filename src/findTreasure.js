const fs = require('fs');

const findTreasure = (type, table, roll) => {
  const fileData = JSON.parse(fs.readFileSync(`src/${type}_data.json`, 'utf-8'));
  const filtered = fileData.filter(t => t.table_low <= table && t.table_high >= table)[0].properties.filter(r => r.roll_low <= roll && r.roll_high >= roll);
  return filtered;
}

module.exports = findTreasure;