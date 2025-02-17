let hexInput1 = "1c0111001f010100061a024b53535009181c"
let hexInput2 = "686974207468652062756c6c277320657965"

function hexToBytes(input) {
  let byteArray = []
  for (let i = 0; i < input.length; i+=2) {
    hexPair =  input.slice(i, i + 2)
    byteArray.push(parseInt(hexPair, 16));
  }
 return byteArray
}

byte1 = hexToBytes(hexInput1)
byte2 = hexToBytes(hexInput2)

function fixedXOR(byte1, byte2){
  let result =[] 
  let decToHex = []
  for(let i=0; i<byte1.length; i++){
    result.push(byte1[i]^byte2[i])
    decToHex.push(result[i].toString(16).padStart(2, '0'));
  }
  
  return decToHex.join('')
}

console.log(fixedXOR(byte1, byte2))


