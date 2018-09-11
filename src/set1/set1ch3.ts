import { englishFrequency } from '../helpers'

// iterate from 0 255 and xor with the string
async function singleByteXOR(buff: Buffer): Promise<Array<any>> {
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
        const score: number = await scoreStringForEnglish(outputBuffer.toString('ascii'))
        if (score < minScore) {
            minScore = score
            minString = outputBuffer.toString('ascii')
            charCode = j
        }
    }

    return Promise.resolve([minScore, minString, charCode])
} 

function scoreStringForEnglish(data: string): Promise<number> {
    const stringLength = data.length
    let score = 0
    const count: number[] = []
    let ignored = 0
    for (let i = 0; i < 26; i++) {
        count[i] = 0
    }
    // first find all non ascii characters and penalize the score
    for (var i = 0; i < stringLength; i++) {
        const c = data.charCodeAt(i)
        if (c >= 65 && c <= 90) {         // uppercase A-Z
            count[c - 65]++
            score -= 10
        } else if ((c >= 97 && c <= 122) || c === 32) { // lowercase a-z
            count[c - 97]++
            score -= 10
        } else if (c >= 33 && c <= 126) { // numbers and punct.
            ignored++
            score += 2
        } else if (c == 9 || c == 10 || c == 13) { // TAB, CR, LF
            ignored++
        } else { // not printable ASCII = impossible(?)
            score += 100000  
        }
    }
    for (let i = 0; i < 26; i++) {
        var observed = count[i], expected = stringLength * englishFrequency[i];
        var difference = observed - expected;
        score += difference*difference / expected;
    }

    return Promise.resolve(score)
}

export {
    singleByteXOR,
    scoreStringForEnglish
}
