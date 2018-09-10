import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { 
    computeHammingDistance, 
    computeKeySize,
    breakRepeatingXor,
    getRepeatingXorKey
 } from '../set1ch6'
import {
    repeatingKeyXor
} from '../set1ch5'
import {
    scoreStringForEnglish
} from '../set1ch3'

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
    const keySizes = computeKeySize(buff)

    t.true(keySizes[0] == 2)
})

ava.test('get repeating key xor key', async t => {
    const textContents = fs.readFileSync(path.join(__dirname, '../../files/set1ch6text.txt'), { encoding: 'ascii' })
    const buff = Buffer.from(textContents, 'base64')
    const res = await getRepeatingXorKey(buff)

    t.true(res[0] === 'mk')  
})

ava.test('do your own repeating xor stuff', async t => {
    const testInput = fs.readFileSync(path.join(__dirname, '../../files/set1ch6text2.txt'), { encoding: 'ascii' })
    const testKey = 'CACtuS'
    const testXorBuffer = repeatingKeyXor(Buffer.from(testInput, 'ascii'), testKey)
    const base64d = testXorBuffer.toString('base64')
    try {
        await fs.writeFileSync(path.join(__dirname, '../../files/set1ch6output.txt'), base64d)
    } catch (e) {
        console.log(e)
    }

    const textContents = fs.readFileSync(path.join(__dirname, '../../files/set1ch6output.txt'), { encoding: 'ascii' })
    const buff = Buffer.from(textContents, 'base64')
    const res = await breakRepeatingXor(buff)

    t.true(res.toString('ascii').includes('If you also wish to estimate the actual likelihood'))
})

ava.test('break repeating key xor', async t => {
    const textContents = fs.readFileSync(path.join(__dirname, '../../files/set1ch6text.txt'), { encoding: 'ascii' })
    const buff = Buffer.from(textContents, 'base64')
    const res = await breakRepeatingXor(buff)

    t.true(res.toString('ascii').includes('I\'m back and I\'m ringin\' the bell'))
})
