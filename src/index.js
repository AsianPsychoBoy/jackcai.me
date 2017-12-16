const express = require('express');
const app = express();

app.use('/scripts/page', express.static('./node_modules/page/'));
app.use('/assets', express.static('./src/public/assets'));
app.use('/', express.static('./src/public'));

app.get('/*', function(req, res) {
	if (req.path !== '/') {
		res.redirect('/');
	}

	res.sendFile('./src/index.html');
	res.end();
})

app.listen(1516, function () {
  console.log('App listening on port 1516!')
});
