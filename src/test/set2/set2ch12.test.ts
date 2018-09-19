import * as ava from 'ava'
import { byteAtaTimeECBDecryption } from '../../set2/set2ch12'


const unknownString = 'Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK'


ava.test('byte at a time ecb decryption', t => {
    const unknownBuffer = Buffer.from(unknownString, 'base64')

    byteAtaTimeECBDecryption(unknownBuffer)
    t.pass()
})