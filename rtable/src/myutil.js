var numLetter = 26;
var numLetterSqr = 26*26;
function getChar(i){       
    var startChar = "A";
    endChar = "Z";
    chCount = endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1;
    return String.fromCharCode(startChar.charCodeAt(0) + i) 
}

function setNameCol(i){
    if (i<numLetter) {return getChar(i);}
    else if (i<numLetterSqr+numLetter){return getChar(Math.floor(i/numLetter)-1)+
        getChar(i%numLetter);}
    else {var x1 = Math.floor(i/numLetterSqr);
      var x2 = Math.floor((i%numLetterSqr)/numLetter);
      var x3 = i - x1*numLetterSqr - x2*numLetter;
      return getChar(x1-1)+
      getChar(x2-1)+getChar(x3);}
}

function getNumFromChar(char){
    var x = char.charCodeAt() - 'A'.charCodeAt() + 1;
    if ((x>26)||(x<1)) {console.log('wrong name of column')}
      else {return x; }
}
function getNumCol(nameCol){

    switch (nameCol.length) {
      case 3: return getNumFromChar(nameCol[0])*numLetterSqr + 
      (getNumFromChar(nameCol[1]))*numLetter + getNumFromChar(nameCol[2])-1;
      break;
      case 2: return getNumFromChar(nameCol[0])*numLetter + 
      getNumFromChar(nameCol[1])-1;
      break;
      case 1: return getNumFromChar(nameCol[0])-1;
      break;
      default: console.log("Error in name of column");
    }  
}