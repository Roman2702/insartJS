var numStr = 30, numCol = 25, numSheets = 3; 
var myTd, myTh, node, nameCol, myTr;

function createTable(numSheet){
//create a header
var myElement = document.getElementById("myTable");
//create a table
var myTb = document.createElement("table");
myTb.setAttribute("id",("sheet"+numSheet));
//hide all sheets except 1st
if (numSheet === 1) {myTb.setAttribute("class","visible");
} else {myTb.setAttribute("class","hidden");}

myTr = document.createElement("tr");
//create 1st cell
myTh = document.createElement("th");
nameCol = "Sheet" + numSheet;
node = document.createTextNode(nameCol);
myTh.appendChild(node);
myTr.appendChild(myTh);

//create raw of th 
for (var i=1; i < numCol; i++) {
    myTh = document.createElement("th");
    if (i<27) {nameCol = getChar(i-1);}
    else if (i<53) {nameCol = 'A' + getChar(i-27);}
 
node = document.createTextNode(nameCol);
myTh.appendChild(node);
myTr.appendChild(myTh);
    }
myTb.appendChild(myTr);
myElement.appendChild(myTb);



for (var i = 0; i < numStr; i++) {
    myTr = document.createElement("tr");
    myElement.appendChild(myTr);
    myTd = document.createElement("td");
    node = document.createTextNode(i+1);
    myTd.appendChild(node);
    myTr.appendChild(myTd);
    for (var j = 1; j < numCol; j++) {
        myTd = document.createElement("td");
        //myInput = document.createElement("input");
        myTd.setAttribute("id",getChar(j)+(i+1));//set id for td
        myTd.setAttribute("class","notIndex");
        //console.log(myInput.id);
        //myTd.appendChild(myInput);
        myTr.appendChild(myTd);
    }
    myTb.appendChild(myTr);
}
myElement.appendChild(myTb);
}
//list of char A - Z
function getChar(i){       
    var startChar = "A";
        endChar = "Z";
        chCount = endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1;
    return String.fromCharCode(startChar.charCodeAt(0) + i) 
}


//create sheets
function createSheets(numSheets){
for (var i = 1; i <= numSheets; i++) {
    createTable(i);
}
}

//change vibility for all sheets ecsept numActiveSheet
function setVisible(numActiveSheet){
for (var i = 0; i < numSheets; i++) {
    if (i === (numActiveSheet-1)) {
        document.getElementsByTagName("table")[i].setAttribute("class", "visible");}
        else {document.getElementsByTagName("table")[i].setAttribute("class", "hidden");}
}
}
//add new sheet
function addSheet(){
createTable(++numSheets);
myElement = document.getElementById("sheetSwitch");
var myBut = document.createElement("button");
myBut.setAttribute("onclick", "setVisible(numSheets)");
node = document.createTextNode("sheet" + numSheets);
myBut.appendChild(node);
myElement.appendChild(myBut);

}