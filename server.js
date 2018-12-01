const express = require('express');

// Create our app

const app = express();
const PORT = process.env.PORT || 3000;

// Redirects all traffic to http if it's https. OpenWeatherMap free API only supports http
app.use(function(req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});

app.use(express.static('public'));

app.listen(PORT, function () {
	console.log('Express server is up on port ' + PORT);
});
