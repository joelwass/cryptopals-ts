import * as ava from 'ava'
import { crackServerEncryption } from '../../set2/set2ch14'

ava.test('should encrypt a string with random string appended to it', async t => {
    await crackServerEncryption()
    t.pass()
})