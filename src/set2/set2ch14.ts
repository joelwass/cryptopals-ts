import * as crypto from 'crypto'
import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'
import { detectAESinECBMode } from '../set1/set1ch8'

const key = genRandomAESKey(16)
// generate a random prefix of some random amount of bytes [0, 100]
const randomPrefix = crypto.randomBytes(Math.floor(Math.random() * 100))
const unknownString = Buffer.from('Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK', 'base64')

function extendedServerEncryption(attackerControlled: Buffer): Promise<Buffer> {
    const totalData = Buffer.concat([randomPrefix, attackerControlled, unknownString], randomPrefix.length + attackerControlled.length + unknownString.length)
    return Promise.resolve(encryptAES128InECB(totalData, key))
}

async function crackServerEncryption(): Promise<any> {
    // so we're going to do similar to ch12.
    // find the blocksize. then determine it's ecb
    // then add TWO full blocks of repeated 'A''s (they will be put in between garbage and unknown string)
    // then iterate through the encrypted blocks and find the repeated A blocks 
    // then chunk off all prior blocks and start decrypting same way as ch12!

    const initialEncrypted: Buffer = await extendedServerEncryption(Buffer.alloc(0))
    const initialLength: number = initialEncrypted.length
    let blockSize: number

    // get block size
    for (let i = 0; i < 41; i++) {
        let str = 'A'.repeat(i)
        let myStringBuff = Buffer.from(str, 'ascii')

        let encrypted = await extendedServerEncryption(myStringBuff)
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

    const ourString = 'A'.repeat(3*blockSize)
    const secondEncrypted: Buffer = await extendedServerEncryption(Buffer.from(ourString, 'ascii'))

    const numberOfBlocks = secondEncrypted.length / blockSize
    let lastBlock: Buffer = secondEncrypted.slice(0, blockSize)
    let currentBlock: Buffer, foundIndex;
    for (let i = 1; i < numberOfBlocks-1; i++) {
        currentBlock = secondEncrypted.slice((i*blockSize), ((i+1)*blockSize))
        // if current block equals last block, we've found our A's
        if (currentBlock.equals(lastBlock)) {
            foundIndex = i+1
        }
        lastBlock = currentBlock
    }

    const unknownStringSlice = Buffer.alloc(numberOfBlocks - foundIndex)
    for (let i = foundIndex; i < numberOfBlocks; i++) {
        unknownStringSlice[i] = secondEncrypted[i]
    }

    // now we have just our unknown string (plus some A's) in a buffer
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
            const serverOutput = await extendedServerEncryption(Buffer.concat([Buffer.from(ourString, 'ascii'), tmpUnknownString]))
    
            // iterate over all char codes
            for (let j = 0; j < 128; j++) {
                const serverTestInput = ourString + knownBlockValues + String.fromCharCode(j)
                // console.log(serverTestInput)
                const serverTestOutput = await extendedServerEncryption(Buffer.concat([Buffer.from(ourString, 'ascii'), tmpUnknownString]))
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

export {
    extendedServerEncryption,
    crackServerEncryption
}