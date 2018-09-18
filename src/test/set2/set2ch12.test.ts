import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { genRandomAESKey } from '../../set2/set2ch11'
import { byteAtaTimeECBDecryption } from '../../set2/set2ch12'

const unknownString = 'Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK'
const key = genRandomAESKey(16)

ava.test('byte at a time ecb decryption', t => {
    const data = fs.readFileSync(path.join(__dirname, '../../../files/set1ch6text2.txt'), { encoding: 'ascii' })
    byteAtaTimeECBDecryption(Buffer.from(data, 'ascii'), Buffer.from(unknownString, 'base64'), key)

    t.pass()
})