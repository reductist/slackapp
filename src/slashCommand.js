const parseCommand = require('./tokenizer.js');
const validateCommand = require('./validator.js');
const findTreasure = require('./findTreasure.js');
const findSpell = require('./findSpell.js');

// attachments: [
//   {
//     image_url: 'https://cdn140.picsart.com/279558593000211.png',
//   }
// ]

const createErrorAttachment = (error) => ({
  color: 'danger',
  text: `*Error*:\n${error.message}`,
  mrkdwn_in: ['text'],
  attachments: [
    {
      image_url: 'https://pbs.twimg.com/profile_images/742951524972810240/WIokgx2O_400x400.jpg',
    }
  ]
})

const createSuccessAttachment = (json) => ({
  response_type: 'in_channel',
  color: 'good',
  text: `Great success! Your table data, as requested:
          ${JSON.stringify(json)}
        `,
  attachments: [
    {
      image_url: 'https://pics.me.me/thumb_great-success-msnogenrga-great-success-borat-swimsuit-meme-on-50474141.png',
    }
  ]
})

// const createAttachment = (result) => createSuccessAttachment(result);

const slashCommandFactory = (body) => {
  if (!body) {
    return {
      text: '',
      attachments: [createErrorAttachment(new Error('Invalid body'))],
    }
  }

  const { type = '', table = '', roll = '', spellname = '' } = parseCommand(body.text)

  // Treasure/coin branch
  if (type === 'loot') {

    console.log(`
      Type: ${type}
      Table: ${table}
      Roll: ${roll}
    `);

    let error;

    console.log(`Validating command request for treasure or coin...`)

    if ((error = validateCommand(type, table, roll))) {
      return {
        text: '',
        attachments: [createErrorAttachment(error)],
      }
    }

    console.log(`Treasure/coin command validated, finding table/roll...`)
    const result = findTreasure(type, table, roll);
    console.log(`Found treasure: ${JSON.stringify(result)}`)

    return {
      response_type: 'in_channel',
      text: `Table: ${table}
Roll: ${roll}
Precious Objects: ${(result) ? JSON.stringify(result[0].precious_objects) : '-'}
Magic Items: ${(result) ? JSON.stringify(result[0].magic_items) : '-'}`,
      attachments: [
        {
          image_url: 'https://pics.me.me/thumb_great-success-msnogenrga-great-success-borat-swimsuit-meme-on-50474141.png',
        }
      ]
    }
  }

  // Spell branch
  if (type === 'spell') {

    console.log(`
      Type: ${type}
      Spell: ${spellname}
    `);

    let error;

    console.log(`Validating command request for spell...`)

    if ((error = validateCommand(type, spellname))) {
      return {
        text: '',
        attachments: [createErrorAttachment(error)],
      }
    }

    console.log(`Spell command validated, finding spell...`)

    const result = findSpell(spellname) || [];

    console.log(`Found spell: ${JSON.stringify(result)}`)

    return {
      response_type: 'in_channel',
      text: `Spell: ${JSON.stringify(result.Name)}
Source: ${JSON.stringify(result.Source)}
Level: ${JSON.stringify(result.Level)}
Casting Time: ${JSON.stringify(result['Casting Time'])}
Duration: ${JSON.stringify(result.Duration)}
School: ${JSON.stringify(result.School)}
Range: ${JSON.stringify(result.Range)}
Components: ${JSON.stringify(result.Components)}
Classes: ${JSON.stringify(result.Classes)}
Detail: ${JSON.stringify(result.Text)}`,
    }
  }
}

module.exports = slashCommandFactory;