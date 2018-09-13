import * as crypto from 'crypto'

function decryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, Buffer.alloc(0))
    const decipheredText = decipher.update(data);

    return decipheredText
}

function encryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, Buffer.alloc(0))
    const cipheredText = cipher.update(data)

    return cipheredText
}

export {
    decryptAES128InECB,
    encryptAES128InECB
}
