import express from 'express';
//import socketio from 'socket.io'
import _ from 'lodash';

import Labels from '../labels/labels'

const app = express();
const server = require('http').Server(app);
//const io = socketio(server);

app.use(express.static('public'));

app.get('/label', function (req, res) {
  // Choose a random label
  res.send(_.sample(Labels.labels));
})

server.listen(3000, function () {
      console.log('listening on port 3000!');
});
