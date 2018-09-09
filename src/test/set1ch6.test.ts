import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { 
    computeHammingDistance, 
    computeKeySize,
    breakRepeatingXor,
    getRepeatingXorKey
 } from '../set1ch6'

ava.test('test hamming distance of two strings', t => {
    const buff1 = Buffer.from('this is a test', 'ascii')
    const buff2 = Buffer.from('wokka wokka!!!', 'ascii')

    t.true(computeHammingDistance(buff1, buff2) === 37)
})

ava.test('buffers not same length throws error for hamming distance', t => {
    const buff1 = Buffer.from('this is a test', 'ascii')
    const buff2 = Buffer.from('wokka wokka', 'ascii')

    try {
        computeHammingDistance(buff1, buff2)
    } catch (e) {
        t.true(e.message === 'buffers are not same length')
    }
})

ava.test('get keysize of buffer', t => {
    const textContents = fs.readFileSync(path.join(__dirname, '../../files/set1ch6text.txt'), { encoding: 'ascii' })
    const buff = Buffer.from(textContents, 'base64')
    const keySize = computeKeySize(buff)
    
    t.true(keySize === 2)
})

ava.test('get repeating key xor key', async t => {
    const textContents = fs.readFileSync(path.join(__dirname, '../../files/set1ch6text.txt'), { encoding: 'ascii' })
    const buff = Buffer.from(textContents, 'base64')
    const res = await getRepeatingXorKey(buff)

    t.true(res === 'XU')  
})

ava.test('break repeating key xor', async t => {
    const textContents = fs.readFileSync(path.join(__dirname, '../../files/set1ch6text.txt'), { encoding: 'ascii' })
    const buff = Buffer.from(textContents, 'base64')
    const res = await breakRepeatingXor(buff)

    console.log(res.toString('ascii'))
    t.pass()
})
