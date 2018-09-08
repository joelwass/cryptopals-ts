import * as ava from 'ava'
import { computeHammingDistance } from '../set1ch6'

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

