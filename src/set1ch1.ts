declare const Buffer: any

// returns a buffer from a string
function hexToBuff(data: string): Buffer {
  return Buffer.from(data, 'hex')
}

// returns a string and takes in a Buffer
function buffTo64(data: Buffer): String {
  return data.toString('base64')
}

export {
  hexToBuff,
  buffTo64
}

