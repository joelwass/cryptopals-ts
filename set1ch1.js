function hexToByte(data) {
    // chunk the string into sets of two, and then convert it to an integer. this is because hex is 2 characters for each byte
    for (var bytes = [], i = 0; i < data.length; i += 2) {
        bytes.push(parseInt(data.substr(i, 2), 16));
    }
    var buff = Buffer.from(data, 'hex');
    console.log(buff);
    return bytes;
}
// 1 byte is 8 bits, or 2 words
// 1111 1111  1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 so max value of 255
function bytesTo64(data) {
    // chunk the bytes into a string
    for (var i = 0; i < data.length; i++) {
    }
}
console.log(hexToByte('FF'));
