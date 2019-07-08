const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/esk-algamoney-ui'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/esk-algamoney-ui/index.html');
});

app.listen(4200);
