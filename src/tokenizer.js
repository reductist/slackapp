const tokenizer = require('string-tokenizer');

const parseCommand = (commandText) => {
  const tokens = tokenizer()
    .input(commandText)
    .token('type',        /treasure|coins/)
    .token('tableID',     /table\d?\d/)
    .token('rollNumber',  /(?:\s)100|[1-9]?[0-9]$/) 
    .resolve()
  return {
    type:  tokens.type,
    table: tokens.tableID,
    roll:  tokens.rollNumber,
  }
}

module.exports = parseCommand;