import * as ava from 'ava'
import { addPKCS7Padding } from '../../set2/set2ch1'

ava.test('add padding to buffer', t => {
    const inputBuffer = Buffer.from('YELLOW SUBMARINE')
    t.true(inputBuffer.length === 16)
    const paddedBuffer = addPKCS7Padding(inputBuffer, 4)
    t.true(paddedBuffer.length === 20)
})
