import * as crypto from 'crypto'

function decryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, Buffer.alloc(0))
    decipher.setAutoPadding(false)
    return Buffer.concat([
        decipher.update(data),
        decipher.final()
    ])
}

function encryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, Buffer.alloc(0))
    cipher.setAutoPadding(false)
    return Buffer.concat([
        cipher.update(data),
        cipher.final()
    ])
}

export {
    decryptAES128InECB,
    encryptAES128InECB
}
