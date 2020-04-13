const validateCommand = (type, table, roll) => {
  if (!type) {
    return new Error('No table type found in your message. Christ, what do I even pay you for?')
  }
  if (!(type === 'treasure' || type === 'coin')) {
    return new Error(`Just 'treasure' or 'coin' fuckwit!`)
  }
  if (!table) {
    return new Error('No table identifier found in your message. Do better!')
  }
  if (!roll) {
    return new Error('No roll found in your message. Are you even trying?')
  }
  if (roll > 100) {
    return new Error('You rolled over 100 on a d100? Really? You dim-witted Orangutan, you get nothing. NUSSSS-EEENG!!!')
  }
}

module.exports = validateCommand;