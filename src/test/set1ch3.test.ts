import * as ava from 'ava'
import { singleByteXOR } from '../set1ch3'

ava.test('decipher single byte xor', t => {
    singleByteXOR('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736')
    t.pass()
})
