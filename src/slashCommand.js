const parseCommand = require('./tokenizer.js');
const validateCommand = require('./validator.js');

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

const createSuccessAttachment = (tableData) => ({
  color: 'good',
  text: `Great success! Your table data, as requested:
          ${tableData}
        `,
  mrkdwn_in: ['text'],
  attachments: [
    {
      image_url: 'https://pics.me.me/thumb_great-success-msnogenrga-great-success-borat-swimsuit-meme-on-50474141.png',
    }
  ]
})

const createAttachment = (result) => {
  if (result.constructor === Error) {
    return createErrorAttachment(result);
  }
  return createSuccessAttachment(result);
}

const slashCommandFactory = (createTreasure) => (body) => new Promise((resolve, reject) => {
  if (!body) {
    return resolve({
      text: '',
      attachments: [createErrorAttachment(new Error('Invalid body'))],
    })
  }

  const { type, table, roll } = parseCommand(body.text)

  let error;
  if ((error = validateCommand(type, table, roll))) {
    return resolve({
      text: '',
      attachments: [createErrorAttachment(error)],
    })
  }

  createTreasure()
    .then((result) => {
      return resolve({
        text: `Found the table for ya.`,
        attachments: result.map(createAttachment),
      })
    })
})

module.exports = slashCommandFactory;