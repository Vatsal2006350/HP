export const AUTH0_CONFIG = {
  clientId: '6845sZR4sugLHCHzn3Zv0ckX3fmszhfg',
  domain: 'dev-pv0ta5h68gbdghef.us.auth0.com',
  clientSecret: '', // You'll need to add your client secret here
};

export const AUTH0_SCOPES = ['openid', 'profile', 'email'];

// Add the allowed callback URLs for your environment
export const REDIRECT_URIS = {
  development: [
    'exp://localhost:19000/--/callback',
    'exp://192.168.1.1:19000/--/callback', // Replace with your local IP
    'exp://127.0.0.1:19000/--/callback',
  ],
  production: [
    // Add your production URLs here when deploying
  ],
}; 