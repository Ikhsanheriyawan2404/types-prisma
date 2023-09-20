import request from 'supertest';
import app from '../../src/index';

describe('CompanyController', () => {
  it('should return a list of companies', async () => {
    const response = await request(app).get('/companies');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Companies');
  });
});