import fs = require('fs')
import readline = require('readline')
import { singleByteXOR } from './set1ch3'

async function findEnglishLineInFile(fileString: string): Promise<any> {
    let minScore = 1000000
    let minString = ''

    const lines = fileString.split('/n')
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i]
        const [resultScore, resultString] = await singleByteXOR(line)
        console.log(resultString)
        if (resultScore < minScore) {
            minScore = resultScore
            minString = resultString
        }
        if (i === lines.length -1) {
            return Promise.resolve(minString)
        }
    }

    // return Promise.resolve(minString)
}

export {
    findEnglishLineInFile
}


