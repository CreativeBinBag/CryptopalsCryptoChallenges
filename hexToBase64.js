let hexInput = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
function base64Encoder (hexInput){

  //convert hexInput to Binary
   
  let hexToBinary = hexInput.split('').map(char=> {
    return parseInt(char,16).toString(2).padStart(4, '0')
  }).join('')
   
  //divide the binary string to 6 segments
  let segments = []

  for(let i=0; i < hexToBinary.length; i+=6){
    segments.push(hexToBinary.slice(i, i+6).padEnd(6, '0'))
  }
  //convert each segmented binary string to decimal
  binaryToDec = segments.map(str => parseInt(str, 2));
 
  //base64 set
  const base64Arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
 
  //convert the decimal values to base64 characters, handle padding
  let encoded = binaryToDec.map(num => base64Arr[num]).join('')
  missingBytes = (hexInput.length/2) % 3
  if (missingBytes === 1){
    encoded+= "=="
  }else if(missingBytes === 2){
    encoded+= "="
  }

  return encoded;

}

console.log (base64Encoder(hexInput))
