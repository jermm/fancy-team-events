/* tslint:disable */
/* eslint-disable */
interface Config {
  okta: Okta;
  sendgrid: Sendgrid;
  hostName: string;
}
interface Sendgrid {
  sendgridSendAPI: string;
  sendgridApiKey: string;
  sendgridTemplateId: string;
}
interface Okta {
  resourceServer: ResourceServer;
}
interface ResourceServer {
  port: number;
  oidc: Oidc;
  assertClaims: AssertClaims;
}
interface AssertClaims {
  aud: string;
  cid: string;
}
interface Oidc {
  issuer: string;
}