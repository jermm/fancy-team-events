const {
  REACT_APP_clientid,
  REACT_APP_issuer,
  REACT_APP_redirectUri,
  REACT_APP_scope,
  REACT_APP_eventsUrl,
  REACT_APP_googleAutoCompleteURL,
  REACT_APP_hereApiAppId,
  REACT_APP_hereApiAppCode
} = process.env;

const Config = {
    oidc: {
      clientId: REACT_APP_clientid,
      issuer: REACT_APP_issuer,
      redirectUri: REACT_APP_redirectUri,
      scope: REACT_APP_scope,
    },
    resourceServer: {
      eventsUrl: REACT_APP_eventsUrl,
    },
    googleAutoCompleteURL : REACT_APP_googleAutoCompleteURL,
    hereApi: {
        appId: REACT_APP_hereApiAppId,
        appCode: REACT_APP_hereApiAppCode
    }
};

export default Config;
