import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'
import { detectAESinECBMode } from '../set1/set1ch8'

const key = genRandomAESKey(16)

async function byteAtaTimeECBDecryption(unknownString: Buffer): Promise<any> {

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
    if (!isECB) {
        return Promise.reject('not ECB!')
    }

    let crackedString = ''
    let tmpUnknownString = unknownString
    // iterate over however many blocksizes we have in unkonwn string
    for (let k = 0; k < (unknownString.length / blockSize); k++) {
        let knownBlockValues = ''
        tmpUnknownString = unknownString.slice((k*blockSize))

        // iterate over each letter in blocksize 
        for (let i = 1; i <= blockSize; i++) {
            // pass in a string of length block size - 1
            const ourString = 'A'.repeat(blockSize - i)
    
            // capture output from server of blocksize - i
            const serverOutput = await serverEncryption(Buffer.from(ourString, 'ascii'), tmpUnknownString)
    
            // iterate over all char codes
            for (let j = 0; j < 128; j++) {
                const serverTestInput = ourString + knownBlockValues + String.fromCharCode(j)
                // console.log(serverTestInput)
                const serverTestOutput = await serverEncryption(Buffer.from(serverTestInput), tmpUnknownString)
                if (serverTestOutput.slice(0, blockSize).equals(serverOutput.slice(0, blockSize))) {
                    knownBlockValues = knownBlockValues + String.fromCharCode(j)
                    crackedString = crackedString + String.fromCharCode(j)
                    break;
                }
            }
        }
    }

    return Promise.resolve(crackedString)
}

function serverEncryption(data: Buffer, unknownString: Buffer): Promise<Buffer> {
    const totalData = Buffer.concat([data, unknownString], data.length + unknownString.length)
    return Promise.resolve(encryptAES128InECB(totalData, key))
}


export { 
    byteAtaTimeECBDecryption,
    serverEncryption
}
