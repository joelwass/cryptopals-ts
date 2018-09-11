import * as crypto from 'crypto'

function decryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, '')
    const decipheredText = decipher.update(data);

    return decipheredText
}

export {
    decryptAES128InECB
}
