import { singleByteXOR } from './set1ch3'
import { repeatingKeyXor } from './set1ch5'

function computeHammingDistance(buff1: Buffer, buff2: Buffer): number {
    let distance = 0
    if (buff1.length !== buff2.length) {
        throw new Error('buffers are not same length')
    }
    const buffLength = buff1.length
    for (let i = 0; i < buffLength; i++) {
        let h = buff1[i] ^ buff2[i]
        while (h > 0) {
            distance++
            h &= h-1
        }
    }

    return distance
}

function computeKeySize(buff: Buffer): number {
    // iterate from keysize 2 to 40
    let minHamming = 100000
    let keyLength = 0
    for (let i = 2; i < 41; i++) {
        const sliced1 = buff.slice(0, i)
        const sliced2 = buff.slice(i, i*2)
        const sliced3 = buff.slice((i*2), i*3)
        const sliced4 = buff.slice((i*3), i*4)

        const hamming1 = computeHammingDistance(sliced1, sliced2)
        const normalized1 = hamming1 / i
        const hamming2 = computeHammingDistance(sliced3, sliced4)
        const normalized2 = hamming2 / i
        const avg = (normalized1 + normalized2) / 2
        if (avg < minHamming) {
            minHamming = avg
            keyLength = i
        }
    }

    return keyLength
}

async function getRepeatingXorKey(buff: Buffer) {
    // grab key size
    const keySize = computeKeySize(buff)
    let keyStringArray = []

    // blocks will be an array of buffers. 
    // each block is a buffer that will be passed into the single char xor breaker
    const blockLength = buff.length / keySize + 1
    let blocks = []
    for (let i = 0; i < keySize; i++) {
        blocks.push(Buffer.alloc(blockLength))
    }

    // create our blocks
    for (let i = 0; i < buff.length; i++) {
        const blockIndex = i % keySize
        const bufferIndex = Math.floor(i / keySize)
        blocks[blockIndex][bufferIndex] = buff[i]
    }

    // iterate over all of our blocks and pass them into the breaker to get the character
    for (let i = 0; i < keySize; i++) {
        const res = await singleByteXOR(blocks[i])
        const character = res[2]
        keyStringArray.push(String.fromCharCode(character))
    }

    return keyStringArray.join('')
}

async function breakRepeatingXor(buff: Buffer): Promise<Buffer> {
    const grabbedKey = await getRepeatingXorKey(buff)
    const returnBuff = repeatingKeyXor(buff, grabbedKey)

    return Promise.resolve(returnBuff)
}

export {
    computeHammingDistance,
    computeKeySize,
    breakRepeatingXor,
    getRepeatingXorKey
}