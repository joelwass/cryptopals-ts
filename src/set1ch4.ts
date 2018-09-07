import fs = require('fs')
import readline = require('readline')
import { singleByteXOR } from './set1ch3'

function findEnglishLineInFile(filePath: string) {
    let minScore = 1000000
    let minString = ''
    const instream = fs.createReadStream(filePath)
    const outstream = new (require('stream'))()
    const rl = readline.createInterface(instream, outstream)
    let closed = false

    rl.on('line', line => {
        const [resultScore, resultString] = singleByteXOR(line)
        if (resultScore < minScore) {
            minScore = resultScore
            minString = resultString
        }
    })

    rl.on('close', () => {
        return minString
    })
}

export {
    findEnglishLineInFile
}


