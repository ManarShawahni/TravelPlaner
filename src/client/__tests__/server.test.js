import request from 'supertest';
import app from '../../../src/server/server.js';

describe('Express Server Test', () => {
  // Test for homepage
  it('should return the homepage (index.html) with a 200 status', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  // Test for getting location data
  it('should respond to POST /getLocation with the correct location data', async () => {
    const mockLocation = { location: 'New York' };
    const response = await request(app)
      .post('/getLocation')
      .send(mockLocation);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'New York');
    expect(response.body).toHaveProperty('lat', '40.71427');
    expect(response.body).toHaveProperty('lng', '-74.00597');
  });

  // Test for invalid location
  it('should respond with a 400 status for an invalid location', async () => {
    const invalidLocation = { location: '' }; 
    const response = await request(app)
      .post('/getLocation')
      .send(invalidLocation);

    expect(response.statusCode).toBe(400); 
    expect(response.body).toHaveProperty('error', 'Location is required');
  });


  // Test for missing request body
  it('should respond with a 400 status for missing request body', async () => {
    const response = await request(app)
      .post('/getLocation')
      .send({}); // Sending an empty object

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Location is required');
  });
});
