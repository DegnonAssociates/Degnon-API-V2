const fetch    = require('node-fetch');
const config   = require('config');
const auth     = require('../../middleware/auth');
const express  = require('express');
const router   = express.Router();

const accountUri = config.get('neonUri') + '/account';

// GET all accounts
router.get('/', auth, async (req,res) => {
	const getUrl = `${accountUri}/listAccountsByDefault?responseType=json&userSessionId=${req.token}`;

	const request = await fetch(getUrl);
	try {
		const response = await request.json();	
	}
	catch (ex) {
		return res.status(400).send('Bad Request: Invalid token');
	}
			
	res.send(response);
});

// GET one account
router.get('/:id', auth, async (req,res) => {

});

module.exports = router;