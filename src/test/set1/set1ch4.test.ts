import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path';
import { findEnglishLineInFile } from '../../set1/set1ch4'

ava.test('find the english from text file single char xor\'d', async t => {
    const textContents = fs.readFileSync(path.join(__dirname, '../../../files/set1ch4text.txt'), { encoding: 'ascii' })
    const testString = await findEnglishLineInFile(textContents, 'hex')
    t.true(testString.trim() === 'Now that the party is jumping')
})

ava.test('catch rejection', async t => {
    try {
        await findEnglishLineInFile('', 'hex')
    } catch (e) {
        t.true(e === 'no string passed in')
    }
})
