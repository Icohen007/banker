const express = require('express');
const cors = require('cors');
const http = require('http');

const campaignsRouter = require('./routes/campaigns');

const app = express();
app.use(cors());
const server = http.createServer(app);
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/campaigns', campaignsRouter);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
