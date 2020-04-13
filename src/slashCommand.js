const parseCommand = require('./tokenizer.js');
const validateCommand = require('./validator.js');
const findTreasure = require('./findTreasure.js')

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

  const { type, table, roll } = parseCommand(body.text)

  console.log(`
    Type: ${type}
    Table: ${table}
    Roll: ${roll}
  `);

  let error;

  console.log(`validating command...`)

  if ((error = validateCommand(type, table, roll))) {
    return {
      text: '',
      attachments: [createErrorAttachment(error)],
    }
  }

  console.log(`command validated, finding treasure...`)

  const result = findTreasure(type, table, roll);

  console.log(`Found treasure: ${result}`)

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

module.exports = slashCommandFactory;