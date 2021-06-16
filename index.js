const njwk = require('node-jwk');

const JWKS_URI = "http://192.168.0.9:3000/jwks";

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