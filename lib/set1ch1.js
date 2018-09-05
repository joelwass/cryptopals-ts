"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// returns a buffer from a string
function hexToBuff(data) {
    return Buffer.from(data, 'hex');
}
exports.hexToBuff = hexToBuff;
// returns a string and takes in a Buffer
function buffTo64(data) {
    return data.toString('base64');
}
exports.buffTo64 = buffTo64;
