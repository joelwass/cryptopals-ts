function detectAESinECBMode(data: Buffer): boolean {
    // iterate over 16 byte blocks and try to detect a repeat
    const dataLength: number = data.length
    const blocks: Array<string> = []

    // console.log(data)

    for (let i = 0; i < (dataLength / 16); i++) {
        const chunk: Buffer = data.slice(i*16, (i+1)*16)
        blocks.push(chunk.toString('hex'))
    }

    const numberOfBlocks: number = blocks.length
    const blockSet: Set<string> = new Set(blocks)

    if (numberOfBlocks !== blockSet.size) {
        return true
    }
    return false
}

export {
    detectAESinECBMode
}