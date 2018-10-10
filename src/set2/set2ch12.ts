import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'
import { detectAESinECBMode } from '../set1/set1ch8'

const key = genRandomAESKey(16)
const unknownString = Buffer.from('Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK', 'base64')

async function byteAtaTimeECBDecryption(): Promise<any> {

    const initialEncrypted: Buffer = await serverEncryption(Buffer.alloc(0))
    const initialLength: number = initialEncrypted.length
    let blockSize: number

    // get block size
    for (let i = 0; i < 41; i++) {
        let str = 'A'.repeat(i)
        let myStringBuff = Buffer.from(str, 'ascii')

        let encrypted = await serverEncryption(myStringBuff)
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

    const numberOfBlocks = initialLength / blockSize
    let crackedString = ''

    // iterate over each letter in blocksize 
    for (let i = 1; i <= initialLength; i++) {
        // pass in a string of length block size - 1
        const ourString = 'A'.repeat(initialLength - i)
        const currentBlock = (numberOfBlocks - 1) - (i % blockSize)

        // capture output from server of blocksize - i
        const serverOutput = await serverEncryption(Buffer.from(ourString, 'ascii'))

        // iterate over all char codes
        for (let j = 0; j < 128; j++) {
            const serverTestInput = ourString + crackedString + String.fromCharCode(j)
            // console.log(serverTestInput)
            const serverTestOutput = await serverEncryption(Buffer.from(serverTestInput))
            if (serverTestOutput.slice(currentBlock - 1, currentBlock).equals(serverOutput.slice(currentBlock - 1, currentBlock))) {
                crackedString = crackedString + String.fromCharCode(j)
                break;
            }
        }
    }

    return Promise.resolve(crackedString)
}

function serverEncryption(data: Buffer): Promise<Buffer> {
    const totalData = Buffer.concat([data, unknownString], data.length + unknownString.length)
    return Promise.resolve(encryptAES128InECB(totalData, key))
}


export { 
    byteAtaTimeECBDecryption,
    serverEncryption
}
