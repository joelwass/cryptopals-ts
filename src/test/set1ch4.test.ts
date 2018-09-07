import * as ava from 'ava'
import { findEnglishLineInFile } from '../set1ch4'

ava.test('find the english from text file single char xor\'d', t => {
    console.log('helo', findEnglishLineInFile('./files/set1ch4text.txt'))
    t.pass()
})