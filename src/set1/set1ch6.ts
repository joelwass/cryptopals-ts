import { singleByteXOR, scoreStringForEnglish } from './set1ch3'
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

function computeKeySize(buff: Buffer): Array<number> {
    // iterate from keysize 2 to 40
    let minHamming = 100000
    // get lowest 10 hamming distances
    let minHammings: number[] = []
    let keyLengths: number[] = []
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

        if (minHammings.length < 10) {
            minHammings.push(avg)
            keyLengths.push(i)
        } else {
            const maxHammingInArray = minHammings.reduce(function(a, b) {
                return Math.max(a, b)
            })
            if (avg < maxHammingInArray) {
                const index = minHammings.indexOf(maxHammingInArray)
                minHammings[index] = avg
                keyLengths[index] = i
            }
        }
    }

    return keyLengths
}

async function getRepeatingXorKey(buff: Buffer): Promise<Array<string>> {
    // grab key sizes
    const keySizes = computeKeySize(buff)
    const returnKeys = []

    for (let j = 0; j < keySizes.length; j++) {
        const keySize = keySizes[j]
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
            const characterCode = res[2]
            keyStringArray.push(String.fromCharCode(characterCode))
        }
        
        returnKeys.push(keyStringArray.join(''))
    }

    return Promise.resolve(returnKeys)
}

async function breakRepeatingXor(buff: Buffer): Promise<Buffer> {
    const grabbedKeys = await getRepeatingXorKey(buff)
    let minScore = 100000000
    let returnBuff: Buffer

    for (let i = 0; i < grabbedKeys.length; i++) {
        const tmpBuff = repeatingKeyXor(buff, grabbedKeys[i])
        const score = await scoreStringForEnglish(tmpBuff.toString('ascii'))
        if (score < minScore) {
            minScore = score
            returnBuff = tmpBuff
        }
    }

    return Promise.resolve(returnBuff)
}

export {
    computeHammingDistance,
    computeKeySize,
    breakRepeatingXor,
    getRepeatingXorKey
}