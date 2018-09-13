import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { decryptAES128InECB, encryptAES128InECB } from '../../set1/set1ch7'

ava.test('decrypt aes 128 ecb with key', t => {
    const data = fs.readFileSync(path.join(__dirname, '../../../files/set1ch7text.txt'), { encoding: 'ascii' })
    const decryptedText = decryptAES128InECB(Buffer.from(data, 'base64'), Buffer.from('YELLOW SUBMARINE', 'ascii'))

    t.true(decryptedText.toString('ascii').includes('I\'m back and I\'m ringin\' the bell'))
})

ava.test('encrypt aes 128 ecb with key', t => {
    const data = 'EXACTLY 16 BYTESEXACTLY 16 BYTES'
    // encrypt
    const encryptedText = encryptAES128InECB(Buffer.from(data, 'ascii'), Buffer.from('YELLOW SUBMARINE', 'ascii'))
    // decrypt
    const decryptedText = decryptAES128InECB(encryptedText, Buffer.from('YELLOW SUBMARINE', 'ascii'))
    t.is(decryptedText.toString('ascii'), data)
})
