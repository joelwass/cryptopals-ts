import * as crypto from 'crypto'
import { encryptAES128inCBC } from './set2ch10'
import { encryptAES128InECB } from '../set1/set1ch7'

function genRandomAESKey(): Buffer {
    return crypto.randomBytes(16)    
}

function encryptDataRandomModeAndKey(data: Buffer): Buffer {
    const key: Buffer = genRandomAESKey()
    let encryptedData: Buffer
    const encryptionMethod = (Math.random() * 2) > 1 ? 'ECB' : 'CBC'
    if (encryptionMethod === 'ECB') {
        encryptedData = encryptAES128InECB(key, data)
    } else {
        encryptedData = encryptAES128inCBC(key, data, crypto.randomBytes(16))
    }
    return encryptedData
}

function ecbCBCDetectionOracle(data: Buffer): Buffer {
    
}

export {
    genRandomAESKey,
    encryptDataRandomModeAndKey
}