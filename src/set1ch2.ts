
function compareBuffLength(data1: string, data2: string): boolean {
    return Buffer.byteLength(data1, 'hex') === Buffer.byteLength(data2, 'hex')
}

function xorHex(data1: string, data2: string): string {
    if (!compareBuffLength(data1, data2)) {
        return 'failure'
    }

    const buff1 = Buffer.from(data1, 'hex')
    const buff2 = Buffer.from(data2, 'hex')
    const outputBuffer = Buffer.alloc(buff1.length)

    for (let i = 0; i < buff1.length; i++) {
        outputBuffer[i] = buff1[i] ^ buff2[i]
    }

    return outputBuffer.toString('hex')
}

export {
    compareBuffLength,
    xorHex
}
