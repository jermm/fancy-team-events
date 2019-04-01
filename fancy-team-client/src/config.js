const Config = {
    oidc: {
      clientId: '0oadrmminV9IDToNc356',
      issuer: 'https://dev-751219.okta.com/oauth2/default',
      redirectUri: 'http://34.211.115.42/implicit/callback',
      scope: 'profile email',
    },
    resourceServer: {
      eventsUrl: 'http://34.211.115.42/graphql',
    }
};

export default Config;
