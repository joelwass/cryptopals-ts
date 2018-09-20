import * as ava from 'ava'
import * as path from 'path'
import * as fs from 'fs'
import {
    genRandomAESKey,
    encryptDataRandomModeAndKey,
    ecbCBCDetectionOracle
} from '../../set2/set2ch11'

ava.test('should generate random crypto key of 16 bytes', t => {
    const key = genRandomAESKey(16)
    t.true(key.length === 16)
})

ava.test('should encrypt data in random mode', t => {
    // not sure how to test this  
    const data = fs.readFileSync(path.join(__dirname, '../../../files/set2ch10text.txt'), { encoding: 'ascii' })
    const [_, encryptionMethod] = encryptDataRandomModeAndKey(Buffer.from(data, 'ascii'))
    t.true((encryptionMethod === 'ECB') || (encryptionMethod === 'CBC'))
})

ava.test('should detect if cbc or ecb', t => {
    const data = fs.readFileSync(path.join(__dirname, '../../../files/set2ch10text.txt'), { encoding: 'ascii' })
    const [encrypted, encryptionMethod] = encryptDataRandomModeAndKey(Buffer.from(data, 'ascii'))
    console.log(encryptionMethod)
    t.true(ecbCBCDetectionOracle(encrypted) === encryptionMethod)
})