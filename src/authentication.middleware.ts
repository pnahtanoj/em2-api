import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import * as OktaJwtVerifier from '@okta/jwt-verifier';

// guid: https://developer.okta.com/quickstart/#/okta-sign-in-page/nodejs/express
// setup: https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server
// config: https://github.com/okta/samples-nodejs-express-4/blob/master/config.js
const oidc = {
  clientId: '0oa1yqjfgt6wAWQMy357',
  issuer: 'https://dev-477058.okta.com/oauth2/default',
  testing: {
    disableHttpsCheck: false,
  },
};

const assertClaims = {
  aud: 'api://default',
  cid: '0oa1yqjfgt6wAWQMy357',
};

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oa1yqjfgt6wAWQMy357',
  issuer: 'https://dev-477058.okta.com/oauth2/default',
  assertClaims,
  testing: {
    disableHttpsCheck: false,
  }
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      console.log('VAlIDARTED: ', jwt);
      next();
    })
    .catch((err) => {
      console.log('ERROR: ', err);
      res.status(401).send(err.message);
    });
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      console.log('NO AUTH HEADER');
      throw new HttpException("Tough luck buddy", 401);
    }

    const accessToken = match[1];

    return oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default')
      .then((jwt) => {
        req.jwt = jwt;
        console.log('JWT VALIDATED: ', jwt);
        next();
      })
      .catch((err) => {
        console.log('ERROR: ', err);
        throw new HttpException(err.message, 401);
      });
  }
}
