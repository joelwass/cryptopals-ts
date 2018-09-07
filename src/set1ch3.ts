import { englishFrequencyMap } from './helpers'

// iterate from 0 255 and xor with the string
function singleByteXOR(data: string): Promise<Array<any>> {
    const buff = Buffer.from(data, 'hex')
    const length = buff.length
    let minScore: number = 1000000000
    let minString: string = ''

    for (let j = 0; j < 256; j++) {
        const outputBuffer = Buffer.allocUnsafe(length)
        for (let i = 0; i < length; i++) {
            outputBuffer[i] = buff[i] ^ j
        }

        // check to see if this is english!
        const score: number = scoreStringForEnglish(outputBuffer.toString('ascii'))
        if (score < minScore) {
            minScore = score
            minString = outputBuffer.toString('ascii')
        }
    }

    return Promise.resolve([minScore, minString])
} 

function scoreStringForEnglish(data: string): number {
    const letters = Object.keys(englishFrequencyMap)
    const stringLength = data.length
    let score = 0
    letters.forEach(l => {
        const countOfLetter = (data.match(new RegExp(l, 'g')) || []).length
        const percentageOccurence = countOfLetter / stringLength * 100
        const diff: number = ((<any>englishFrequencyMap)[l] * 1000) - (percentageOccurence * 1000)
        score += diff
    })

    return score / 1000
}

export {
    singleByteXOR,
    scoreStringForEnglish
}
