import { singleByteXOR } from './set1ch3'

async function findEnglishLineInFile(fileString: string): Promise<string> {
    let minScore = 1000000
    let minString = ''

    if (!fileString || fileString === '') {
        return Promise.reject('no string passed in')
    }

    const lines = fileString.split('\n')
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const buff = Buffer.from(line, 'hex')
        const [resultScore, resultString] = await singleByteXOR(buff)
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
