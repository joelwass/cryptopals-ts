import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { encryptAES128inCBC, decryptAES128inCBC } from '../../set2/set2ch10'

ava.test('encrypt aes 128 in cbc', t => {
    const data = 'EXACTLY 16 BYTES'
    const IV = Buffer.alloc(16, 0)
    const key = Buffer.from('YELLOW SUBMARINE', 'ascii')
    const encrypted = encryptAES128inCBC(Buffer.from(data, 'ascii'), key, IV)

    t.true(encrypted.toString('base64').includes('kRHkt/ReT'))
    t.true(decryptAES128inCBC(encrypted, key, IV).toString('ascii').includes('EXACTLY 16 BYTES'))
})

ava.test('decrypt aes 128 in cbc', t => {
    const data = fs.readFileSync(path.join(__dirname, '../../../files/set2ch10text.txt'), { encoding: 'ascii' })
    const IV = Buffer.alloc(16, 0)
    const key = Buffer.from('YELLOW SUBMARINE', 'ascii')
    const decrypted = decryptAES128inCBC(Buffer.from(data, 'base64'), key, IV)

    t.true(decrypted.toString('ascii').includes('I\'m back and I\'m ringin\' the bell'))
})
