import * as ava from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import { detectAESinECBMode } from '../../set1/set1ch8'

ava.test('detect aes in ecb node', t => {
    const textInput = fs.readFileSync(path.join(__dirname, '../../../files/set1ch8text.txt'), 'ascii')
    const lines = textInput.split('\n')
    const potentialAESLines = []
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const isAESinECB = detectAESinECBMode(Buffer.from(line, 'hex'))
        if (isAESinECB) {
            potentialAESLines.push(line)
        }
    }
    t.true(potentialAESLines.length === 1)
})

