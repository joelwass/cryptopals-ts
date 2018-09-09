
function repeatingKeyXor(buff: Buffer, key: string): Buffer {
    const keyBuff = Buffer.from(key, 'ascii')
    const outputBuff = Buffer.alloc(buff.length)
    for (let i = 0; i < buff.length; i++) {
        const keyIndex = i % key.length
        outputBuff[i] = buff[i] ^ keyBuff[keyIndex]
    }

    return outputBuff
}

export {
    repeatingKeyXor
}
