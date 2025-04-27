const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
const app = express();

app.use(express.json());
app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add('Hello! How can I assist you today?');
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  agent.handleRequest(intentMap);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
