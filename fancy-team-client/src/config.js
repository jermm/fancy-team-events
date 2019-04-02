const Config = {
    oidc: {
      clientId: '0oaeua30mnzGCYZcN356',
      issuer: 'https://dev-751219.okta.com/oauth2/default',
      redirectUri: 'http://localhost:3000/implicit/callback',
      scope: 'profile email',
    },
    resourceServer: {
      eventsUrl: 'http://localhost:4000/graphql',
    }
};

export default Config;
