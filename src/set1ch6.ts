
function computeHammingDistance(buff1: Buffer, buff2: Buffer): number {
    let distance = 0
    if (buff1.length !== buff2.length) {
        throw new Error('buffers are not same length')
    }
    const buffLength = buff1.length
    for (let i = 0; i < buffLength; i++) {
        let h = buff1[i] ^ buff2[i]
        while (h > 0) {
            distance++
            h &= h-1
        }
    }

    return distance
}

export {
    computeHammingDistance
}