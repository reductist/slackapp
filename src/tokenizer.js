const parseCommand = (commandText) => {
  const typeRegex = /^(?<type>treasure|coin|spell)/gyi;
  const typeCheck = typeRegex.exec(commandText);
  console.log(`Request command type: ${typeCheck.groups.type}`);

  if (typeCheck.groups.type === 'treasure' || typeCheck.groups.type === 'coin') {
    const cleaned = commandText.replace(/treasure |coins /g, '');
    const lootRegex = /(?:\s*table=)(?<table>\d+\d*)(?:\sroll=)(?<roll>\d+\d*)$/gyi;
    const lootMatches = lootRegex.exec(cleaned);
    return {
      type: 'loot',
      table: lootMatches.groups.table,
      roll: lootMatches.groups.roll,
    }
  }

  if (typeCheck.groups.type === 'spell') {
    const cleaned = commandText.replace(/spell /g, '').replace(/[|'&;$%@"<>()+, ]/g, '');
    const spellRegex = /(?:\s*name=)(?<spellname>(\w+))$/gyi
    const spellMatches = spellRegex.exec(cleaned);
    return {
      type: 'spell',
      spellname: spellMatches.groups.spellname,
    }
  }
}

module.exports = parseCommand;