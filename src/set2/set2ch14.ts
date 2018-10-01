import * as crypto from 'crypto'
import { encryptAES128InECB } from '../set1/set1ch7'
import { genRandomAESKey } from '../set2/set2ch11'

const key = genRandomAESKey(16)
// generate a random prefix of some random amount of bytes [0, 100]
const randomPrefix = crypto.randomBytes(Math.random() * 100)

function extendedServerEncryption(attackerControlled: Buffer, unknownString: Buffer): Promise<Buffer> {
    const totalData = Buffer.concat([randomPrefix, attackerControlled, unknownString], randomPrefix.length + attackerControlled.length + unknownString.length)
    return Promise.resolve(encryptAES128InECB(totalData, key))
}

export {
    extendedServerEncryption
}