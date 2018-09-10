import * as ava from 'ava'
import { singleByteXOR, scoreStringForEnglish } from '../set1ch3'

ava.test('decipher single byte xor', async t => {
    const buff = Buffer.from('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736', 'hex')
    const res = await singleByteXOR(buff)
    t.true(res[1] === 'Cooking MC\'s like a pound of bacon')
})

ava.test('decipher single byte xor', async t => {
    const buff = Buffer.from('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736', 'hex')
    const res = await singleByteXOR(buff)
    t.true(String.fromCharCode(res[2]) === 'X')
})

ava.test('get english score less than gibberish', async t => {
    const score = await scoreStringForEnglish('hello world')
    const badScore = await scoreStringForEnglish('1298slk2380vns230')
    t.true(score < badScore)
})

ava.test('good english', async t => {
    t.true(await scoreStringForEnglish('Cooking MC\'s like a pound of bacon') < await scoreStringForEnglish('Dhhlni`\'JD t\'knlb\'f\'whric\'ha\'efdhi'))
})
