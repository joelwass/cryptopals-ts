
// iterate from 0 255 and xor with the string
function singleByteXOR(data: string): string {
    const buff = Buffer.from(data, 'hex')
    const length = buff.length

    for (let j = 0; j < 256; j++) {
        const outputBuffer = Buffer.allocUnsafe(length)
        for (let i = 0; i < length; i++) {
            outputBuffer[i] = buff[i] ^ j
        }

        // check to see if this is english!
        console.log(outputBuffer.toString('hex'))
    }

    return 'hello'
} 

export {
    singleByteXOR
}
