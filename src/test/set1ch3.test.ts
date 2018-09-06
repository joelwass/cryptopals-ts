import * as ava from 'ava'
import { singleByteXOR, scoreStringForEnglish } from '../set1ch3'

ava.test('decipher single byte xor', t => {
    t.true(singleByteXOR('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736') === 'Cooking MC\'s like a pound of bacon')
})

ava.test('get english probability score', t => {
    const score = scoreStringForEnglish('hello world')
    t.true(score > 9 && score < 10)
})

ava.test('get english score less than gibberish', t => {
    const score = scoreStringForEnglish('hello world')
    const badScore = scoreStringForEnglish('1298slk2380vns230')
    t.true(score < badScore)
})
