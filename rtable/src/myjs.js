var numStr = 30, numCol = 25; 
function createTable(){
//create a header
var myElement = document.getElementById("tableHeader");
var myTd, myTh, node, nameCol, myTr;
myTr = document.createElement("tr");
nameCol = "Sheet";
for (var i=1; i <= numCol; i++) {
    myTh = document.createElement("th");
    if (i<27) {nameCol = getChar(i-1);}
    else if (i<53) {nameCol = 'A' + getChar(i-27);}
 
node = document.createTextNode(nameCol);
myTh.appendChild(node);
myTr.appendChild(myTh);
    }
myElement.appendChild(myTr);

//create e table
myElement = document.getElementById("mainTable");
for (var i = 0; i < numStr; i++) {
    myTr = document.createElement("tr");
    myElement.appendChild(myTr);
    myTd = document.createElement("td");
    node = document.createTextNode(i+1);
    myTd.appendChild(node);
    myTr.appendChild(myTd);
    for (var j = 0; j < numCol; j++) {
        myTd = document.createElement("td");
        //myInput = document.createElement("input");
        myTd.setAttribute("id",getChar(j)+(i+1));//set id for td
        myTd.setAttribute("class","notIndex");
        //console.log(myInput.id);
        //myTd.appendChild(myInput);
        myTr.appendChild(myTd);
    }
}
}
//list of char A - Z
    function getChar(i){       
        var startChar = "A";
            endChar = "Z";
            chCount = endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1;
        return String.fromCharCode(startChar.charCodeAt(0) + i) }
