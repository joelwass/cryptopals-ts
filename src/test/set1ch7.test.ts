import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { decryptAES128InECB } from '../set1ch7'

ava.test('decrypt aes 128 ecb with key', t => {
    const data = fs.readFileSync(path.join(__dirname, '../../files/set1ch7text.txt'), { encoding: 'ascii' })
    const decryptedText = decryptAES128InECB(Buffer.from(data, 'base64'), Buffer.from('YELLOW SUBMARINE', 'ascii'))

    t.true(decryptedText.includes('I\'m back and I\'m ringin\' the bell'))
})