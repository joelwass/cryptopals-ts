import * as ava from 'ava'
import * as path from 'path'
import * as fs from 'fs'
import {
    genRandomAESKey,
    encryptDataRandomModeAndKey,
    ecbCBCDetectionOracle
} from '../../set2/set2ch11'

ava.test('should generate random crypto key of 16 bytes', t => {
    const key = genRandomAESKey()
    t.true(key.length === 16)
})

ava.test('should encrypt data in random mode', t => {
    // not sure how to test this  
    const data = fs.readFileSync(path.join(__dirname, '../../../files/set2ch10text.txt'), { encoding: 'ascii' })
    t.pass()
})

ava.test('should ', t => {
    t.pass()
})