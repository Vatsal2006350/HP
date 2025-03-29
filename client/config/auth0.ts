export const AUTH0_CONFIG = {
  clientId: '6845sZR4sugLHCHzn3Zv0ckX3fmszhfg',
  domain: 'dev-pv0ta5h68gbdghef.us.auth0.com',
  clientSecret: '6SV5xZLd-cS2OEpW1iPCZ-pJWXLf6hSf5M4Cf_MJ6iUPL3Rg3IpVMnJtAWv60BIF', // Check this in your Auth0 application settings
};

export const AUTH0_SCOPES = ['openid', 'profile', 'email'];

// Add the allowed callback URLs for your environment
export const REDIRECT_URIS = {
  development: [
    'exp://localhost:19000/--/callback',
    'exp://192.168.1.1:19000/--/callback', // Replace with your local IP
    'exp://127.0.0.1:19000/--/callback',
    'http://localhost:8081/callback', // For web
  ],
  production: [
    // Add your production URLs here when deploying
  ],
}; 