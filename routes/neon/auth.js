const _        = require('lodash');
const fetch    = require('node-fetch');
const Joi      = require('joi');
const validate = require('../../middleware/validate');
const express  = require('express');
const router   = express.Router();

// POST user
router.post('/', validate(validateAuth), async (req,res) => {
	const loginUri = 'https://api.neoncrm.com/neonws/services/api/common/login';
	const loginApiKey = req.body.apiKey;
	const loginOrgId = req.body.organizationId;
	const getUrl = `${loginUri}?login.apiKey=${loginApiKey}&login.orgid=${loginOrgId}`;

	const request = await fetch(getUrl);
	const response = await request.json();	
	
	if (response.loginResponse.operationResult === 'FAIL') 
		return res.status(400).send('NEON Authorization Failed');
	
	res.send(response.loginResponse.userSessionId);	
});

function validateAuth(req) {
	const schema = {
		organizationId: Joi.string().min(3).max(255).required(),
		apiKey: Joi.string().min(32).max(32).required()
	};

	return Joi.validate(req, schema);
};

module.exports = router;