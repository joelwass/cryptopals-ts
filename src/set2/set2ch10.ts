import { encryptAES128InECB, decryptAES128InECB } from '../set1/set1ch7'
import { addPKCS7Padding } from './set2ch9'

function encryptAES128inCBC(data: Buffer, key: Buffer, iv: Buffer) {
    const paddedData: Buffer = addPKCS7Padding(data, 16)
    const encryptedData: Buffer = Buffer.alloc(paddedData.length)
    // initially the ivValue is the iv passed in
    let ivValue: Buffer = iv

    for (let i = 0; i < (paddedData.length / 16); i++) {
        const ivBlock: Buffer = Buffer.alloc(16)
        for (let j = 0; j < 16; j++) {
            ivBlock[j] = data[(j + (i * 16))] ^ ivValue[j]
        }
        const cipherBlock = encryptAES128InECB(ivBlock, key)
        for (let j = 0; j < 16; j++) {
            encryptedData[(j + (i * 16))] = cipherBlock[j]
        }
        ivValue = cipherBlock
    }

    return encryptedData
}

function decryptAES128inCBC(data: Buffer, key: Buffer, iv: Buffer) {
    const plainTextData: Buffer = Buffer.alloc(data.length)
    // initially the iv value is the last 16 bytes of the encrypted data
    let ivValue: Buffer = iv

    for (let i = 0; i < (data.length / 16); i++) {
        const cipherBlock = data.slice(i*16, (i+1)*16)
        const keyBlock: Buffer = decryptAES128InECB(cipherBlock, key)
        for (let j = 0; j < 16; j++) {
            plainTextData[(j + (i * 16))] = keyBlock[j] ^ ivValue[j]
        }
        ivValue = cipherBlock
    }

    return plainTextData
}

export {
    encryptAES128inCBC,
    decryptAES128inCBC
}