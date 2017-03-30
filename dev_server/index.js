const express = require('express');
const app = express();

app.use('/scripts/page', express.static('./node_modules/page/'));
app.use('/assets', express.static('./assets'));
app.use('/', express.static('./src'));

app.get('/*', function(req, res) {
	res.redirect('/');
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});
