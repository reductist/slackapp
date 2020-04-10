const validateCommand = (type, table, roll) => {
  if (!type) {
    return new Error('No table type found in your message. Christ, what do I even pay you for?')
  }
  if (!table) {
    return new Error('No table identifier found in your message. Do better!')
  }
  if (!roll) {
    return new Error('No roll found in your message. Are you even trying?')
  }
}

module.exports = validateCommand;