import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'
import { detectAESinECBMode } from '../set1/set1ch8'

const key = genRandomAESKey(16)

async function byteAtaTimeECBDecryption(unknownString: Buffer) {

    const initialEncrypted: Buffer = await serverEncryption(Buffer.alloc(0), unknownString)
    const initialLength: number = initialEncrypted.length
    let blockSize: number

    // get block size
    for (let i = 0; i < 41; i++) {
        let str = 'A'.repeat(i)
        let myStringBuff = Buffer.from(str, 'ascii')

        let encrypted = await serverEncryption(myStringBuff, unknownString)
        if (encrypted.length !== initialLength) {
            // block size has increased by block size amount, so let's find block size
            blockSize = encrypted.length - initialLength
            break
        }
    }

    // detect ecb or cbc
    const isECB = detectAESinECBMode(unknownString, blockSize)
    let knownValues = ''

    // iterate over each letter in blocksize 
    for (let i = 1; i <= 1; i++) {
        // pass in a string of length block size - 1
        const ourString = 'A'.repeat(blockSize - i)

        // capture output from server of blocksize - i
        const serverOutput = await serverEncryption(Buffer.from(ourString, 'ascii'), unknownString)

        // iterate over all char codes
        for (let j = 0; j < 256; j++) {
            const serverTestInput = ourString + String.fromCharCode(j) + knownValues
            const serverTestOutput = await serverEncryption(Buffer.from(serverTestInput), unknownString)
            if (serverTestOutput == serverOutput) {
                knownValues = String.fromCharCode(j) + knownValues
                console.log(knownValues)
            }
        }
    }


}

function serverEncryption(data: Buffer, unknownString: Buffer): Promise<Buffer> {
    const totalData = Buffer.concat([data, unknownString], data.length + unknownString.length)
    return Promise.resolve(encryptAES128InECB(totalData, key))
}


export { 
    byteAtaTimeECBDecryption,
    serverEncryption
}
