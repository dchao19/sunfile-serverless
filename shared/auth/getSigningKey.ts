import * as jwksClient from "jwks-rsa";

const keyClient = jwksClient({
    strictSsl: true,
    jwksUri: "https://sunfile.auth0.com/.well-known/jwks.json"
});

export default function(kid: string) {
    return new Promise<string>((resolve, reject) => {
        keyClient.getSigningKey(kid, (err: Error, key: jwksClient.Jwk) => {
            if (err) {
                return reject(err);
            }
            return resolve(key.publicKey || key.rsaPublicKey);
        });
    });
}
