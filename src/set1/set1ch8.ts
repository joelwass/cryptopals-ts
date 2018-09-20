function detectAESinECBMode(data: Buffer, blockSize: number): boolean {
    // iterate over 16 byte blocks and try to detect a repeat
    const blocks = new Set()

    for (let i = 0; i < (data.length / blockSize); i++) {
        const chunk: Buffer = data.slice(i*blockSize, (i+1)*blockSize)
        blocks.add(chunk.toString('hex'))
    }
    if ((data.length / blockSize) !== blocks.size) {
        return true
    }
    return false
}

export {
    detectAESinECBMode
}