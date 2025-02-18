let plaintext = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal"
let key = "ICE"
let byteArray = plaintext.split("").map(char => char.charCodeAt(0))
let keyArray = key.split("").map(char => char.charCodeAt(0))

function byteToHexa (byteArray){
  let hexaString = []
  for(let i=0; i < byteArray.length; i++){
    hexaString.push((byteArray[i]^keyArray[i%3]).toString(16).padStart(2, '0'))
   
  }

  return hexaString.join('');
}

console.log(byteToHexa(byteArray))

