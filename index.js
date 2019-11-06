const njwk = require('node-jwk');

const JWKS_URI = "https://jws-helper.cy.scaleforce.com.cy/jwks";

// var jwk = { kty: 'EC', crv: 'P-256', x: '...', y: '...' },
//     pem = jwkToPem(jwk);

const request = require('request');

request(JWKS_URI, { json: true }, (err, res, body) => {
    if (err) {
        return console.log(err);
    }

    const myKeySet = njwk.JWKSet.fromObject(body);

    myKeySet.keys.forEach(element => {
        if (element.alg && element.alg === "PS256") {

            if (element.kid) {
                console.log(`kid : ${element.kid}`)
            }

            const pem = element.key.hasPrivateKey
                ? element.key.toPrivateKeyPEM()
                : element.key.toPublicKeyPEM();

            console.log(pem);

        }
    });
});