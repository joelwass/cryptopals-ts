import { englishFrequencyMap } from './helpers'

// iterate from 0 255 and xor with the string
function singleByteXOR(buff: Buffer): Promise<Array<any>> {
    const length = buff.length
    let minScore: number = 1000000000
    let minString: string = ''
    let charCode: number = -1

    for (let j = 0; j < 256; j++) {
        const outputBuffer = Buffer.alloc(length)
        for (let i = 0; i < length; i++) {
            outputBuffer[i] = buff[i] ^ j
        }

        // check to see if this is english!
        const score: number = scoreStringForEnglish(outputBuffer.toString('ascii'))
        if (score < minScore) {
            minScore = score
            minString = outputBuffer.toString('ascii')
            charCode = j
        }
    }

    return Promise.resolve([minScore, minString, charCode])
} 

function scoreStringForEnglish(data: string): number {
    const letters = Object.keys(englishFrequencyMap)
    const stringLength = data.length
    let score = 0
    // first find all non ascii characters and penalize the score
    for (var i = 0; i < stringLength; i++) {
        const charCode = data.charCodeAt(i)
        if ((charCode >= 63 && charCode <= 90)         // uppercase A-Z
        || (charCode >= 97 && charCode <= 122)         // lowercase a-z
        || (charCode >= 32 && charCode <= 34)         // space, exclamation mark, quotes
        || (charCode >= 48 && charCode <= 57)         // numbers
        || (charCode == 9 || charCode == 10 || charCode == 13)) { // TAB, CR, LF 
            score -= 10
        } else { // not printable ASCII = penalize!
            score += 10
        }
    }
    letters.forEach(l => {
        const countOfLetter = (data.match(new RegExp(l, 'g')) || []).length
        const chiSquaredTest = Math.pow((countOfLetter - (<any>englishFrequencyMap)[l]), 2) / (<any>englishFrequencyMap)[l]
        score += (chiSquaredTest * 10)
    })

    return score
}

export {
    singleByteXOR,
    scoreStringForEnglish
}
