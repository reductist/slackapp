const Express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const findTreasure = require('./treasure.js');
const slashCommandFactory = require('./slashCommand.js');

const app = new Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {PORT} = process.env

// Ngrok port
const port = PORT || 80

const treasureClient = findTreasure;
const slashCommand = slashCommandFactory(treasureClient)

app.post('/loot', (req, res) => {
  slashCommand(req.body)
    .then((result) => {
      return res.json(result)
    })
    .catch(console.error)
})

app.get('/', function(req, res) {
  res.send(`Ngrok is working! Path Hit: ${req.url}`);
});

app.post('/command', function(req, res) {
  res.send('You lucky dog, your ngrok tunnel is up and running! Now lick my poopshoot and grab your ankles, cause here comes Santa.');
});

// Handle /oauth route GET requests
app.get('/oauth', function(req, res) {
  // If oath is missing
  if (!req.query.code) {
    res.status(500);
    res.send({"Error": "Looks like we're not getting your code... fixitfixitfixit"});
    console.log("Looks like we're not getting a code.");
  } else {
    // If oath is extant
    request({
      url: 'https://slack.com/api/oauth.access',
      qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret},
      method: 'GET',
    }, function (error, response, body) {
      if (error) {
        console.log(error);
      } else {
        res.json(body);
      }
    })
  }
});

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})