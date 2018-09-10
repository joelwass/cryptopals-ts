const aesjs = require('aes-js')

function decryptAES128InECB(data: Buffer, key: Buffer): Buffer {
    const aesEcb = new aesjs.ModeOfOperation.ecb(key)
    const decryptedBytes = aesEcb.decrypt(data)
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)

    return decryptedText
}

export {
    decryptAES128InECB
}
