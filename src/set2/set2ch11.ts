import * as crypto from 'crypto'
import { encryptAES128inCBC } from './set2ch10'
import { encryptAES128InECB } from '../set1/set1ch7'
import { detectAESinECBMode } from '../set1/set1ch8'

function genRandomAESKey(length: number): Buffer {
    return crypto.randomBytes(length)    
}

function encryptDataRandomModeAndKey(data: Buffer): Array<any> {
    const key: Buffer = genRandomAESKey(16)
    let encryptedData: Buffer
    const encryptionMethod = (Math.random() * 2) > 1 ? 'ECB' : 'CBC'
    if (encryptionMethod === 'ECB') {
        encryptedData = encryptAES128InECB(data, key)
    } else {
        encryptedData = encryptAES128inCBC(data, key, crypto.randomBytes(16))
    }
    return [encryptedData, encryptionMethod]
}

function ecbCBCDetectionOracle(data: Buffer): string {
    return detectAESinECBMode(data) ? 'ECB' : 'CBC'
}

export {
    genRandomAESKey,
    encryptDataRandomModeAndKey,
    ecbCBCDetectionOracle
}