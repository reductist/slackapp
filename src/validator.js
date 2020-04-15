const validateCommand = (type, table, roll, spellname) => {
  if (!type) {
    return new Error(`No 'type' found in your message. Christ, what do I even pay you for? Try using 'treasure', 'coin' or 'spell'.`)
  }
  if (!(type === 'loot' || type === 'spell')) {
    return new Error(`Just 'treasure', 'coin', or 'spell' you fuckwit!`)
  }
  if (type === 'loot' && !table) {
    return new Error(`No table identifier found in your message. Do better!`)
  }
  if (type === 'loot' && !roll) {
    return new Error(`No roll found in your message. Are you even trying?`)
  }
  if (type === 'loot' && roll > 100) {
    return new Error(`You rolled over 100 on a d100? Really? You dim-witted Orangutan, you get nothing. NUSSSS-EEENG!!!`)
  }
}

module.exports = validateCommand;