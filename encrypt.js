const crypto = require('crypto');

// 1. Your 32-byte hex secret
const entitySecretHex = '56bd92001f1e52ce2cd39e73d8c0b2e75f75099ba7d162fd8d0048942f7a87f9';

// 2. Updated Public Key string with explicit manual line breaks
const publicKeyPem = "-----BEGIN PUBLIC KEY-----\n" +
"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA7/c1+0KDsWU4b6qWAMkf\n" +
"HI1eUvYrvwDBfx3bNCAXvRilRKn42xmRAGnTG7FOENcwjh2iwovnOcRWv6FlOb0T\n" +
"/usgsG+/8ziBkAxNFgbnNMP4lTiK+0zc7NBlb5/pCDfH+X8v7MenWwsuvK7NJuyS\n" +
"KFTVyRxsbkfJGplUqt85G5Z9hcBcT4n7FA96+LbPSfy++XCTPxQsqCdCejxcD9kr\n" +
"vVoBAAV+7ovplyRRgmt7NPV72vA/wVWqfPCp9jvt9g+Tdm8R1wAhNoYAyg9FFhhy\n" +
"NS3A6IyVjk6/IHGq9WawuE0uOesq5CnZ4iizBeAq2HZ9VUIg0KDTISxQif9EFk4D\n" +
"htxhOxxdUqBnOau21PWhCOy0a4CpWds9qo6wU9HF8C+zK4sWioWO2Cc2Y2xjEYEn\n" +
"DdAUCqxaHbCz5Xl/dZECnPnXFTGR4rmaMwK4m72kmAiVL59X0C2nIK6t7yuFQj+c\n" +
"CcjoMXdpJeG4fAGv+4XMERJyAiiS9yKTEHC2XRi3CTEBn8UI+MrqoPRi4rhUiOkV\n" +
"76dN0FHneBKdkVbU4Eza1trZkY4hjaVKGqlpj1khXP66+T8Q6/s1aRKJYbH3UVIP\n" +
"Waon4pt40q8MEDNHIJsrNrd8XD9WVxcK6FgrOBUf8E6IWCNXS11h82QBPOgm03GW\n" +
"eTQ3pOlAPVhQ38SHO7XWeQsCAwEAAQ==\n" +
"-----END PUBLIC KEY-----";

function generateCiphertext(secretHex, publicKey) {
    const secretBuffer = Buffer.from(secretHex, 'hex');
    
    const encrypted = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, secretBuffer);

    return encrypted.toString('base64');
}

try {
    const ciphertext = generateCiphertext(entitySecretHex, publicKeyPem);
    console.log("\n--- YOUR CIPHERTEXT ---");
    console.log(ciphertext);
    console.log("-----------------------\n");
    console.log("Next: Paste this into the Circle Console Configurator.");
} catch (err) {
    console.error("Encryption error details:", err.stack);
}