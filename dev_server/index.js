const express = require('express');
const app = express();

// app.use('/scripts/page', express.static('./node_modules/page/'));
// app.use('/assets', express.static('./assets'));
// app.use('/', express.static('./src'));

// app.get('/*', function(req, res) {
// 	console.log('redirected');
// 	res.redirect('/');
// })

app.listen(1516, function () {
  console.log('App listening on port 1516!')
});
