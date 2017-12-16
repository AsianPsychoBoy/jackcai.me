const path = require('path');
const express = require('express');
const app = express();

app.use('/scripts/page', express.static(__dirname + '/../node_modules/page/'));
app.use('/', express.static(__dirname + '/public/'));

app.get('*', function(req, res) {
	if (req.path !== '/') {
		res.redirect('/');
	}
});

app.listen(1516, function () {
  console.log('App listening on port 1516!')
});
