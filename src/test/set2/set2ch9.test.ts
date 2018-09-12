import * as ava from 'ava'
import { addPKCS7Padding } from '../../set2/set2ch9'

ava.test('add padding to buffer of lesser size than the blocksize', t => {
    const inputBuffer = Buffer.from('YELLOW SUBMARINE')
    t.true(inputBuffer.length === 16)
    const paddedBuffer = addPKCS7Padding(inputBuffer, 20)
    t.true(paddedBuffer.length === 20)
})

ava.test('add padding to buffer of greater size than the blocksize', t => {
    const inputBuffer = Buffer.from('YELLOW SUBMARINE BLAH BLAH')
    const paddedBuffer = addPKCS7Padding(inputBuffer, 20)
    console.log(paddedBuffer)
    t.true(paddedBuffer.length === 40)
})
