const fs = require('fs');

const findSpell = (spellname) => {
  const spells = JSON.parse(fs.readFileSync(`src/all_spell_data.json`, 'utf-8'));
  // const spellArray = Object.entries(fileData);
  const filtered = spells.find(target => target.Name.toLowerCase().replace(/[\-|'&;$%@"<>()+, ]/g, '') === spellname.toLowerCase().replace(/[\-|'&;$%@"<>()+, ]/g, ''));
  console.log(`Filtered Result: ${filtered}`);
  return filtered;
}

module.exports = findSpell;