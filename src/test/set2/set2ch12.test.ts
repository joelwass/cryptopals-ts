import * as ava from 'ava'
import { byteAtaTimeECBDecryption } from '../../set2/set2ch12'


ava.test('byte at a time ecb decryption', async t => {
    const result = await byteAtaTimeECBDecryption()
    t.true(result.includes('With my rag-top down so my hair can blow'))
})