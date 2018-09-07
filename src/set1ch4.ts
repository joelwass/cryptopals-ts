import fs = require('fs')
import readline = require('readline')
import { singleByteXOR } from './set1ch3'

function findEnglishLineInFile(fileString: string) {
    let minScore = 1000000
    let minString = ''

    const lines = fileString.split('/n')
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i]
        const [resultScore, resultString] = singleByteXOR(line)
        if (resultScore < minScore) {
            minScore = resultScore
            minString = resultString
        }
    }

    return minString
}

export {
    findEnglishLineInFile
}


