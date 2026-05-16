// 纯 JS MD5 实现 - 兼容不支持 MD5 的浏览器环境

function md5cycle(x: number[], k: number[]) {
  let a = x[0], b = x[1], c = x[2], d = x[3]
  a = ff(a, b, c, d, k[0], 7, -680876936)
  d = ff(d, a, b, c, k[1], 12, -389564586)
  c = ff(c, d, a, b, k[2], 17, 606105819)
  b = ff(b, c, d, a, k[3], 22, -1044525330)
  a = ff(a, b, c, d, k[4], 7, -176418897)
  d = ff(d, a, b, c, k[5], 12, 1200080426)
  c = ff(c, d, a, b, k[6], 17, -1473231341)
  b = ff(b, c, d, a, k[7], 22, -45705983)
  a = ff(a, b, c, d, k[8], 7, 1770035416)
  d = ff(d, a, b, c, k[9], 12, -1958414417)
  c = ff(c, d, a, b, k[10], 17, -42063)
  b = ff(b, c, d, a, k[11], 22, -1990404162)
  a = ff(a, b, c, d, k[12], 7, 1804603682)
  d = ff(d, a, b, c, k[13], 12, -40341101)
  c = ff(c, d, a, b, k[14], 17, -1502002290)
  b = ff(b, c, d, a, k[15], 22, 1236535329)

  a = gg(a, b, c, d, k[1], 5, -165796510)
  d = gg(d, a, b, c, k[6], 9, -1069501632)
  c = gg(c, d, a, b, k[11], 14, 643717713)
  b = gg(b, c, d, a, k[0], 20, -373897302)
  a = gg(a, b, c, d, k[5], 5, -701558691)
  d = gg(d, a, b, c, k[10], 9, 38016083)
  c = gg(c, d, a, b, k[15], 14, -660478335)
  b = gg(b, c, d, a, k[4], 20, -405537848)
  a = gg(a, b, c, d, k[9], 5, 568446438)
  d = gg(d, a, b, c, k[14], 9, -1019803690)
  c = gg(c, d, a, b, k[3], 14, -187363961)
  b = gg(b, c, d, a, k[8], 20, 1163531501)
  a = gg(a, b, c, d, k[13], 5, -1444681467)
  d = gg(d, a, b, c, k[2], 9, -51403784)
  c = gg(c, d, a, b, k[7], 14, 1735328473)
  b = gg(b, c, d, a, k[12], 20, -1926607734)

  a = hh(a, b, c, d, k[5], 4, -378558)
  d = hh(d, a, b, c, k[8], 11, -2022574463)
  c = hh(c, d, a, b, k[11], 16, 1839030562)
  b = hh(b, c, d, a, k[14], 23, -35309556)
  a = hh(a, b, c, d, k[1], 4, -1530992060)
  d = hh(d, a, b, c, k[4], 11, 1272893353)
  c = hh(c, d, a, b, k[7], 16, -155497632)
  b = hh(b, c, d, a, k[10], 23, -1094730640)
  a = hh(a, b, c, d, k[13], 4, 681279174)
  d = hh(d, a, b, c, k[0], 11, -358537222)
  c = hh(c, d, a, b, k[3], 16, -722521979)
  b = hh(b, c, d, a, k[6], 23, 76029189)
  a = hh(a, b, c, d, k[9], 4, -640364487)
  d = hh(d, a, b, c, k[12], 11, -421815835)
  c = hh(c, d, a, b, k[15], 16, 530742520)
  b = hh(b, c, d, a, k[2], 23, -995338651)

  a = ii(a, b, c, d, k[0], 6, -198630844)
  d = ii(d, a, b, c, k[7], 10, 1126891415)
  c = ii(c, d, a, b, k[14], 15, -1416354905)
  b = ii(b, c, d, a, k[5], 21, -57434055)
  a = ii(a, b, c, d, k[12], 6, 1700485571)
  d = ii(d, a, b, c, k[3], 10, -1894986606)
  c = ii(c, d, a, b, k[10], 15, -1051523)
  b = ii(b, c, d, a, k[1], 21, -2054922799)
  a = ii(a, b, c, d, k[8], 6, 1873313359)
  d = ii(d, a, b, c, k[15], 10, -30611744)
  c = ii(c, d, a, b, k[6], 15, -1560198380)
  b = ii(b, c, d, a, k[13], 21, 1309151649)
  a = ii(a, b, c, d, k[4], 6, -145523070)
  d = ii(d, a, b, c, k[11], 10, -1120210379)
  c = ii(c, d, a, b, k[2], 15, 718787259)
  b = ii(b, c, d, a, k[9], 21, -343485551)

  x[0] = add32(a, x[0])
  x[1] = add32(b, x[1])
  x[2] = add32(c, x[2])
  x[3] = add32(d, x[3])
}

function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
  a = add32(add32(a, q), add32(x, t))
  return add32((a << s) | (a >>> (32 - s)), b)
}

function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t)
}

function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t)
}

function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn(b ^ c ^ d, a, b, x, s, t)
}

function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t)
}

function add32(a: number, b: number) {
  return (a + b) & 0xffffffff
}

function md5str(s: string) {
  const state = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]
  const buffer: number[] = new Array(64)
  let index = 0

  function md5_update(data: string) {
    const len = data.length
    for (let i = 0; i < len; i++) {
      buffer[index++] = data.charCodeAt(i) & 0xff
      if (index === 64) {
        md5_transform()
        index = 0
      }
    }
  }

  function md5_transform() {
    const block: number[] = new Array(16)
    for (let i = 0; i < 16; i++) {
      block[i] = buffer[i * 4] | (buffer[i * 4 + 1] << 8) | (buffer[i * 4 + 2] << 16) | (buffer[i * 4 + 3] << 24)
    }
    md5cycle(state, block)
  }

  // Process the string
  md5_update(s)

  // Pad
  const bits = s.length * 8
  const padding = [0x80]
  const padLen = (56 - (s.length + 1) % 64 + 64) % 64
  for (let i = 0; i < padLen; i++) padding.push(0)

  for (let i = 0; i < padding.length; i++) {
    buffer[index++] = padding[i]
    if (index === 64) {
      md5_transform()
      index = 0
    }
  }

  // Append length in bits
  for (let i = 0; i < 8; i++) {
    buffer[index++] = (bits >>> (i * 8)) & 0xff
  }
  md5_transform()

  return hex(state)
}

function hex(x: number[]) {
  const hexChars = '0123456789abcdef'
  let s = ''
  for (let i = 0; i < 4; i++) {
    s += hexChars[(x[i] >> 4) & 0xf] + hexChars[x[i] & 0xf] +
      hexChars[(x[i] >> 12) & 0xf] + hexChars[(x[i] >> 8) & 0xf] +
      hexChars[(x[i] >> 20) & 0xf] + hexChars[(x[i] >> 16) & 0xf] +
      hexChars[(x[i] >> 28) & 0xf] + hexChars[(x[i] >> 24) & 0xf]
  }
  return s
}

export function md5(str: string): string {
  return md5str(str)
}

export async function md5File(file: File): Promise<string> {
  const chunkSize = 64 * 1024
  const state = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]
  const buffer: number[] = new Array(64)
  let index = 0
  let totalLen = 0

  function transform() {
    const block: number[] = new Array(16)
    for (let i = 0; i < 16; i++) {
      block[i] = buffer[i * 4] | (buffer[i * 4 + 1] << 8) | (buffer[i * 4 + 2] << 16) | (buffer[i * 4 + 3] << 24)
    }
    md5cycle(state, block)
  }

  function update(data: Uint8Array) {
    for (let i = 0; i < data.length; i++) {
      buffer[index++] = data[i]
      if (index === 64) {
        transform()
        index = 0
      }
    }
  }

  const totalChunks = Math.ceil(file.size / chunkSize)
  for (let chunk = 0; chunk < totalChunks; chunk++) {
    const start = chunk * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const bytes = new Uint8Array(await file.slice(start, end).arrayBuffer())
    totalLen += bytes.length
    update(bytes)
  }

  // Padding
  const bits = totalLen * 8
  const padding = [0x80]
  const padLen = (56 - (totalLen + 1) % 64 + 64) % 64
  for (let i = 0; i < padLen; i++) padding.push(0)

  for (let i = 0; i < padding.length; i++) {
    buffer[index++] = padding[i]
    if (index === 64) {
      transform()
      index = 0
    }
  }

  for (let i = 0; i < 8; i++) {
    buffer[index++] = (bits >>> (i * 8)) & 0xff
  }
  transform()

  return hex(state)
}
