const fs = require('fs');

const findSpell = (spellname) => {
  const fileData = JSON.parse(fs.readFileSync(`src/spell_data.json`, 'utf-8'));
  const spellArray = Object.entries(fileData);
  const filtered = spellArray.find(target => target[0].toLowerCase().replace(/[|'&;$%@"<>()+, ]/g, '') === spellname.toLowerCase().replace(/\s/g, ''));
  console.log(`Filtered Result: ${filtered}`);
  return filtered;
}

module.exports = findSpell;