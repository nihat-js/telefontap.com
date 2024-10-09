const axios = require('axios');
const assert = require('assert');

const describe = require("mocha")
const apiUrl = 'https://your-api-url.com/api/v1/'; // Replace with your API URL
let authToken;


describe('Authentication API Tests', () => {

  let user = {
    email: "randommail" + Date.now() + "@gmail.com",
    password: "passwordpassword"
  }

  it('should signup new', async () => {
    const response = await axios.post(apiUrl + "auth/register", newUser)
    assert.strictEqual(response.status, 200)
    assert(response.data.token)
  })


  it('should log in successfully and return a token', async () => {

    const response = await axios.post(`${apiUrl}/login`, newUser);
    assert.strictEqual(response.status, 200);
    assert(response.data.token); // Check that a token is returned
    user.token = response.data.token; // Save the token for later use
  });

  it('should log out', async () => {

    const response = await axios.post(`${apiUrl}/logout`, newUser);
    assert.strictEqual(response.status, 200);
    assert(response.data.token); // Check that a token is returned
    user.token = response.data.token; // Save the token for later use
  });

  it

  it('should access a protected route with the token', async () => {
    const response = await axios.get(`${apiUrl}/protected`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    assert.strictEqual(response.status, 200);
    assert(response.data.message === 'Access granted'); // Adjust based on your API response
  });

  it('should fail to access a protected route without a token', async () => {
    try {
      await axios.get(`${apiUrl}/protected`);
    } catch (error) {
      assert.strictEqual(error.response.status, 401); // Unauthorized
      assert.strictEqual(error.response.data.message, 'No token provided'); // Adjust based on your API response
    }
  });
});
