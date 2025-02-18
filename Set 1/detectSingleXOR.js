//the approach is going to be the same as singleByteXORCipher, but we're going to carry out that operation for each 60-character long hexadecimal string in the text file.


fetch('https://cryptopals.com/static/challenge-data/4.txt')
  .then(response => response.text())
  .then(dataString => { 

    let allHexStrings = dataString.split('\n'); 

    let overallBestScore = -Infinity;    
    let overallBestKey = -1;           
    let overallBestDecryptedText = "";  
    let bestLineNumber = -1;           

    for (let lineNumber = 0; lineNumber < allHexStrings.length; lineNumber++) {
      let hexString = allHexStrings[lineNumber];
      if (hexString.trim() !== "") { 

        let encryptedBytes = hexaToByte(hexString); 

        let bestScoreForThisLine = -Infinity; 
        let bestKeyForThisLine = -1;
        let bestDecryptedTextForThisLine = "";

        for (let keyByte = 0; keyByte <= 255; keyByte++) {
          let potentialDecryptedBytes = encryptedBytes.map(eByte => eByte ^ keyByte);
          let potentialDecryptedText = String.fromCharCode(...potentialDecryptedBytes);
          let currentScore = scoringText(potentialDecryptedText);

          if (currentScore > bestScoreForThisLine) {
            bestScoreForThisLine = currentScore;
            bestKeyForThisLine = keyByte;
            bestDecryptedTextForThisLine = potentialDecryptedText;
          }
        }

        if (bestScoreForThisLine > overallBestScore) {
          overallBestScore = bestScoreForThisLine;
          overallBestKey = bestKeyForThisLine;
          overallBestDecryptedText = bestDecryptedTextForThisLine;
          bestLineNumber = lineNumber + 1; 
        }
      }
    }

    //output the overall best result *after* all lines are processed
    console.log("Overall Best Line Number:", bestLineNumber);
    console.log("Overall Best Key (decimal):", overallBestKey);
    console.log("Overall Best Key (character):", String.fromCharCode(overallBestKey));
    console.log("Overall Best Score:", overallBestScore);
    console.log("Overall Best Decrypted Text:", overallBestDecryptedText);

  })
  .catch(error => console.error('Error fetching the file:', error));


function hexaToByte(hexaInput){
  let byteArray = [];
  for(let i=0; i <hexaInput.length; i+=2){
    hexaPair = hexaInput.slice(i, i+2);
    byteArray.push(parseInt(hexaPair, 16));
  }
  return byteArray;
}

function scoringText(text){
 let score = 0; 
  for(let i=0; i<text.length; i++){
    charCode = text.charCodeAt(i);
    if(
      (charCode >=65 && charCode <= 90) || //uppercase letters 'A' - 'Z'
      (charCode >=97 && charCode <= 122) || //lowercase letters 'a' - 'z'
      (charCode >= 48 && charCode <=57) || //digits
      (charCode === 32) || //space
      [33, 44, 46, 58, 59, 63].includes(charCode) // Punctuation
    ){
      score++;
    }else{
      score -= 10;
    }
  }
 return score;
}

