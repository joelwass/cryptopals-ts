function detectAESinECBMode(data: Buffer): boolean {
    // iterate over 16 byte blocks and try to detect a repeat
    const blocks = new Set()

    for (let i = 0; i < (data.length / 16); i++) {
        const chunk: Buffer = data.slice(i*16, (i+1)*16)
        blocks.add(chunk.toString('hex'))
    }
    if ((data.length / 16) !== blocks.size) {
        return true
    }
    return false
}

export {
    detectAESinECBMode
}