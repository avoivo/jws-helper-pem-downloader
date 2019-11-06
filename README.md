# jws-helper-pem-downloader

A helper tool written in js, that downloads the PS256 signing certificate of a jwks and converts it to PEM.

## Installation

Node js installation standard.

```bash
npm i
```

## Usage

```bash
node index.js
```

## After geting the private key


Create public key certificate from private PEM.

```bash
openssl req -new -x509 -key privkey.pem -out cacert.pem -days 1095

```