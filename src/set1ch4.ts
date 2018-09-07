import { singleByteXOR } from './set1ch3'

async function findEnglishLineInFile(fileString: string): Promise<any> {
    let minScore = 1000000
    let minString = ''

    const lines = fileString.split('\n')
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i]
        const [resultScore, resultString] = await singleByteXOR(line)
        if (resultScore < minScore) {
            minScore = resultScore
            minString = resultString
        }
    }

    return Promise.resolve(minString)
}

export {
    findEnglishLineInFile
}
