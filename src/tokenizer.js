const parseCommand = (commandText) => {
  const regex = /^(?<type>treasure|coin)(?:\stable=)(?<table>\d+?\d+)(?:\sroll=)(?<roll>\d+\d+)$/gyi;
  const matches = regex.exec(commandText);
  return {
    type:  matches.groups.type,
    table: matches.groups.table,
    roll:  matches.groups.roll,
  }
}

module.exports = parseCommand;