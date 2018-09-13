import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { encryptAES128inCBC, decryptAES128inCBC } from '../../set2/set2ch10'

ava.test('encrypt aes 128 in cbc', t => {
    t.pass()
})

ava.test('decrypt aes 128 in cbc', t => {
    const data = fs.readFileSync(path.join(__dirname, '../../../files/set2ch10text.txt'), { encoding: 'ascii' })
    const IV = Buffer.alloc(16, 0)
    const key = Buffer.from('YELLOW SUBMARINE', 'ascii')

    const decrypted = decryptAES128inCBC(Buffer.from(data, 'ascii'), key, IV)
    console.log(decrypted.toString('ascii'))
    t.pass()
})