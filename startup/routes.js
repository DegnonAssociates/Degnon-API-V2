const helmet       = require('helmet');
const compression  = require('compression');
const express      = require('express');
const errorHandler = require('../middleware/error');
const home         = require('../routes/home');
const neonAuth     = require('../routes/neon/auth');
const neonLogout   = require('../routes/neon/logout');


module.exports = function(app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static('public'));
	app.use(helmet());
	app.use(compression());

	app.use('/', home);
	app.use('/api/v2/neon/auth', neonAuth);
	app.use('/api/v2/neon/logout', neonLogout);
	app.use(errorHandler);
}

