const request = require('supertest');
const fetch   = require('node-fetch');
const config  = require('config');

describe('NEON Accounts', () => {
	let server;
	let loginApiKey;
	let loginOrgId;

	beforeEach(() => {
		server = require('../../../index');
		loginApiKey = config.get('loginApiKey');
		loginOrgId = config.get('loginOrgId');
	});
	afterEach(async () => {
		await server.close();
	});

	const execLogin = () => {
		return request(server)
			.post('/api/v2/neon/login')
			.send({ organizationId: loginOrgId, apiKey: loginApiKey });
	}

	describe('GET NEON Account info', () => {
		it('should return 401 if no x-auth-token passed in header', async () => {
			const response = await request(server)
				.get('/api/v2/neon/accounts/');

			expect(response.status).toBe(401);
		});

		it('should return 400 if an invalid x-auth-token passed in header', async () => {
			const response = await request(server)
				.get('/api/v2/neon/accounts/')
				.set('x-auth-token', '11111111111111111111111111111111');

			expect(response.status).toBe(400);
		});

		it('should return a members object if request is valid', async () => {
			const login = await execLogin();

			const response = await request(server)
				.get('/api/v2/neon/accounts/')
				.set('x-auth-token', login.text);

			console.log(login.text);

			expect(response.status).toBe(200);
		});
	});
});