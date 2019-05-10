const fetch    = require('node-fetch');
const config   = require('config');
const auth     = require('../../middleware/auth');
const express  = require('express');
const router   = express.Router();

const accountUri = config.get('neonUri') + '/account';

// GET all accounts
router.get('/', auth, async (req,res) => {
	let response;
	const getUrl = `${accountUri}/listAccountsByDefault?userSessionId=${req.token}`;

	const request = await fetch(getUrl);
	try {
		response = await request.json();	
	}
	catch (ex) {
		return res.status(400).send('Bad Request');
	}
	if(response.listAccountsByDefaultResponse.operationResult === 'FAIL')
		return res.status(400).send('Bad Request: Invalid token');
			
	res.send(response.listAccountsByDefaultResponse);
});

// GET one account
router.get('/:id', auth, async (req,res) => {
	let response;
	const getUrl = `${accountUri}/retrieveIndividualAccount?userSessionId=${req.token}&accountId=${req.params.id}`;

	const request = await fetch(getUrl);
	try {
		response = await request.json();	
	}
	catch (ex) {
		return res.status(400).send('Bad Request');
	}
	if(response.listAccountsByDefaultResponse.operationResult === 'FAIL')
		return res.status(400).send('Bad Request: Invalid token');
			
	res.send(response);
});

module.exports = router;