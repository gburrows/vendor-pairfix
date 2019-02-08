const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Redirects all traffic to http if it's https.
app.use(function(req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});

app.use(express.static('public'));

app.listen(PORT, HOST, function () {
	console.log('Express server is up on port ' + PORT);
});
