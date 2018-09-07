import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path';
import { findEnglishLineInFile } from '../set1ch4'

ava.test('find the english from text file single char xor\'d', t => {
    console.log('hi')
    fs.readFile(path.join(__dirname, '../../files/set1ch4text.txt'), 'hex', (err, data) => {
        console.log('in here?')
        console.log(err)
        console.log(data)
        // console.log('helo', findEnglishLineInFile(data.toString('hex')))
        // t.pass()
    })
})