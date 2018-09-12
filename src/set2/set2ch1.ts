
function addPKCS7Padding(data: Buffer, padding: number): Buffer {
    // add <padding> number of bytes, each the number <padding> to the end of data
    // have to do this by adding to new Buffer
    const retBuffer: Buffer = Buffer.alloc(data.length + padding)
    for (let i = 0; i < (data.length + padding); i++) {
        if (i < data.length) {
            retBuffer[i] = data[i]
        } else {
            console.log(Buffer.from(`${padding}`, 'hex'))
            retBuffer[i] = Buffer.from(`${padding}`, 'hex')[0]
        }
    }
    return retBuffer
}

export {
    addPKCS7Padding
}