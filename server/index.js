const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const { fetchRecentBids } = require('./db/fetcher');
const campaignsRouter = require('./routes/campaigns');

const app = express();
app.use(cors());
const server = http.createServer(app);
const port = 5000;

app.use('/campaigns', campaignsRouter);

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('new connection: ', socket.id);
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

fetchRecentBids(io, 1000);
