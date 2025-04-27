const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add('Hello! How can I assist you today?');
  }

  function fallback(agent) {
    agent.add("I'm sorry, I didn't understand that. Could you please rephrase?");
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);

  agent.handleRequest(intentMap);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
