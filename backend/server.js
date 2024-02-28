const express = require('express');
const bodyParser = require('body-parser');
const OpenTok = require('opentok');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const apiKey = '9cf17345';
const apiSecret = 'PL1zaW8rAeXfgQwz';
const opentok = new OpenTok(apiKey, apiSecret);



// Create a session
app.post('/session', (req, res) => {
    console.log('API Key:', apiKey);
    console.log('API Secret:', apiSecret)
  opentok.createSession({ mediaMode: 'routed' }, (error, session) => {
    console.log('Error is', error)
    if (error) {
      return res.status(500).json({ error: 'Error creating session' });
    }
    const sessionId = session.sessionId;
    res.json({ sessionId });
  });
});

// Generate a token for a user to join a session
app.post('/token', (req, res) => {
  const { sessionId, userName } = req.body;
  const token = opentok.generateToken(sessionId, { role: 'publisher', data: userName });
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
