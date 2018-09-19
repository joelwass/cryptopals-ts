import { computeKeySize } from '../set1/set1ch6'
import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'

const key = genRandomAESKey(16)

function byteAtaTimeECBDecryption(unknownString: Buffer) {

    for (let i = 40; i < 41; i++) {
        let str = 'A'.repeat(i)
        let myStringBuff = Buffer.from(str, 'ascii')

        let encrypted = serverEncryption(myStringBuff, unknownString)
        console.log(computeKeySize(encrypted))
    }

}

function serverEncryption(data: Buffer, unknownString: Buffer): Buffer {
    const totalData = Buffer.concat([data, unknownString], data.length + unknownString.length)
    return encryptAES128InECB(totalData, key)
}


export { 
    byteAtaTimeECBDecryption,
    serverEncryption
}
