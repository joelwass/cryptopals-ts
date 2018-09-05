"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava = require("ava");
const set1ch1_1 = require("../set1ch1");
ava.test('changes hex to base64', t => {
    t.is(set1ch1_1.buffTo64(set1ch1_1.hexToBuff('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d')), 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t');
});
