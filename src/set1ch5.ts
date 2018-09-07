
function repeatingKeyXor(data: string, key: string): string {
    const dataBuff = Buffer.from(data, 'ascii')
    const keyBuff = Buffer.from(key, 'ascii')
    const outputBuff = Buffer.allocUnsafe(dataBuff.length)
    for (let i = 0; i < dataBuff.length; i++) {
        const keyIndex = i % key.length
        outputBuff[i] = dataBuff[i] ^ keyBuff[keyIndex]
    }

    return outputBuff.toString('hex')
}

export {
    repeatingKeyXor
}
