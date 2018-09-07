import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path';
import { findEnglishLineInFile } from '../set1ch4'

ava.test('find the english from text file single char xor\'d', t => {
    const textContents = fs.readFileSync(path.join(__dirname, '../../files/set1ch4text.txt'), { encoding: 'ascii' })
    findEnglishLineInFile(textContents)
    .then(res => {
        console.log(res)
    })
    // t.fail()
})
