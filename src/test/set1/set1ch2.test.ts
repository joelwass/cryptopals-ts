import * as ava from 'ava'
import { compareBuffLength, xorHex } from '../../set1/set1ch2'

ava.test('test no difference in lengths between hex strings', t => {
    t.true(compareBuffLength('ffff', 'ffff'))
})

ava.test('test difference in lengths between hex strings', t => {
    t.false(compareBuffLength('ffff', 'ff'))
})

ava.test('test xor of bad hex strings that shouldnt match', t => {
    t.false(xorHex('1c0111001f010100061a024b53535009181c', '686974207468652072756c6c277320657965') === '746865206b696420646f6e277420706c6179')
})

ava.test('test xor of bad hex strings that shouldnt match bc of diff lengths', t => {
    t.true(xorHex('1c0111001f010100061a024b53535009181c', '686974207468652756c6c277320657965') === 'failure')
})

ava.test('test xor accurately of hex strings', t => {
    t.true(xorHex('1c0111001f010100061a024b53535009181c', '686974207468652062756c6c277320657965') === '746865206b696420646f6e277420706c6179')
})
