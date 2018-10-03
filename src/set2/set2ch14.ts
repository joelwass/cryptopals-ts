import * as crypto from 'crypto'
import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'
import { detectAESinECBMode } from '../set1/set1ch8'

const key = genRandomAESKey(16)
// generate a random prefix of some random amount of bytes [0, 100]
const randomPrefix = crypto.randomBytes(Math.random() * 100)
const unknownString = Buffer.from('Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK', 'ascii')

function extendedServerEncryption(attackerControlled: Buffer): Promise<Buffer> {
    const totalData = Buffer.concat([randomPrefix, attackerControlled, unknownString], randomPrefix.length + attackerControlled.length + unknownString.length)
    return Promise.resolve(encryptAES128InECB(totalData, key))
}

async function crackServerEncryption() {
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
}

export {
    extendedServerEncryption
}