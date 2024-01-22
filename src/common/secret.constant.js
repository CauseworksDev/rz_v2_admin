const SECRET_CRYPTO_TYPE = {
    MD5: "md5",
    SHA256: "sha256",
    SHA512: "sha512",
    AES256: 'aes-256-cbc',
};

const SECRET_KEY = {
    str: 'COVID-19qkdlfjtm',
    keyStr: 'vaccine'
};

const SECRET_CIPHER_GEN = {
    user: {
        key: '8253606534e207c0f9c37301d7416d9f',
        iv: '34e207c0f9c37301',
    },
    corp: {
        key: 'f9c37301d7416d9f8253606534e207c0',
        iv: 'f9c3730134e207c0',
    }
};

module.exports = {
    SECRET_CRYPTO_TYPE: SECRET_CRYPTO_TYPE,
    SECRET_KEY,
    SECRET_CIPHER_GEN,
};