import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'
import { detectAESinECBMode } from '../set1/set1ch8'

const key = genRandomAESKey(16)

function byteAtaTimeECBDecryption(unknownString: Buffer) {

    const initialEncrypted: Buffer = serverEncryption(Buffer.alloc(0), unknownString)
    const initialLength: number = initialEncrypted.length
    let blockSize: number

    // get block size
    for (let i = 0; i < 41; i++) {
        let str = 'A'.repeat(i)
        let myStringBuff = Buffer.from(str, 'ascii')

        let encrypted = serverEncryption(myStringBuff, unknownString)
        if (encrypted.length !== initialLength) {
            // block size has increased by block size amount, so let's find block size
            blockSize = encrypted.length - initialLength
            break
        }
    }

    // detect ecb or cbc
    const isECB = detectAESinECBMode(unknownString, blockSize)
}

function serverEncryption(data: Buffer, unknownString: Buffer): Buffer {
    const totalData = Buffer.concat([data, unknownString], data.length + unknownString.length)
    return encryptAES128InECB(totalData, key)
}


export { 
    byteAtaTimeECBDecryption,
    serverEncryption
}
