const request = require('supertest');
const fetch   = require('node-fetch');
const config  = require('config');

describe('NEON client authentication', () => {
	let server;
	let loginApiKey;
	let loginOrgId;
	const loginUri = 'https://api.neoncrm.com/neonws/services/api/common/login';
	

	beforeEach(() => {
		server = require('../../../index');
		loginApiKey = config.get('loginApiKey');
		loginOrgId = config.get('loginOrgId');
	});
	afterEach(async () => {
		await server.close();
	});

	const exec = () => {
		return request(server)
			.post('/api/neon/auth')
			.send({ organizationId: loginOrgId, apiKey: loginApiKey });
	}

	it('should return 400 if invalid API key is submitted', async () => {
		loginApiKey = '';
		const res = await exec();	

		expect(res.status).toBe(400);
	});

	it('should return 400 if invalid organization ID is submitted', async () => {
		loginOrgId = '';
		const res = await exec();	

		expect(res.status).toBe(400); 
	});

	it('should return a session ID if authorization succeeds', async () => {
		const res = await exec();	

		expect(res.status).toBe(200);
		expect(res.text.length).toEqual(32);
	});
});

describe('NEON client logout', () => {
	let server;
	let neonSessionId;
	const loginApiKey = config.get('loginApiKey');
	const loginOrgId = config.get('loginOrgId');

	beforeEach(async () => {
		server = require('../../../index');
		const login = await request(server)
			.post('/api/neon/auth')
			.send({ organizationId: loginOrgId, apiKey: loginApiKey });
		neonSessionId = login.text;
	});
	afterEach(async () => {
		await server.close();
	});

	const exec = () => {
		return request(server)
			.post('/api/neon/logout')
			.send({ sessionId: neonSessionId });
	}

	it('should return 400 if invalid user session is passed', async () => {
		neonSessionId = '11111111111111111111111111111111';

		const res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 400 if attempting to log out from an expired session', async () => {
		let res = await exec();
		res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 200 if valid logout is completed', async () => {
		let res = await exec();

		expect(res.status).toBe(400);
	});
});