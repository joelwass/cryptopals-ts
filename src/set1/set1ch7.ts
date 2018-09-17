import * as crypto from 'crypto'
import { addPKCS7Padding } from '../set2/set2ch9'

function decryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const paddedData: Buffer = addPKCS7Padding(data, 16)
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, Buffer.alloc(0))
    decipher.setAutoPadding(false)
    return Buffer.concat([
        decipher.update(paddedData),
        decipher.final()
    ])
}

function encryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const paddedData: Buffer = addPKCS7Padding(data, 16)
    const cipher = crypto.createCipheriv('aes-128-ecb', key, Buffer.alloc(0))
    cipher.setAutoPadding(false)
    return Buffer.concat([
        cipher.update(paddedData),
        cipher.final()
    ])
}

export {
    decryptAES128InECB,
    encryptAES128InECB
}
