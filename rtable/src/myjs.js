//global variables
var numRow = 100, numCol = 100, numSheets = 3, maxNumCol = 26*26*26; 
var rowNum, cellNum;//coordinates of cell (still dosn't work)
var myTd, myTh, node, nameCol, myTr;

function createTable(numSheet){
var myInput;
var myElement = document.getElementById("myTable");
//create a table in div id = myTable
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
for (var i=0; i < numCol; i++) {
    myTh = document.createElement("th");
    nameCol = setNameCol(i);
    node = document.createTextNode(nameCol);
    myTh.appendChild(node);
    myTr.appendChild(myTh);
    }
myTb.appendChild(myTr);
myElement.appendChild(myTb);


// create rows of td
for (var i = 0; i < numRow; i++) {
    myTr = document.createElement("tr");
    myElement.appendChild(myTr);
    myTd = document.createElement("td");
    node = document.createTextNode(i+1);
    myTd.appendChild(node);
    myTr.appendChild(myTd);
    for (var j = 1; j <= numCol; j++) {
        myTd = document.createElement("td");
        myTd.setAttribute("id",setNameCol(j-1)+(i+1));//set id for td
        myTd.setAttribute("class","notIndex");
        //add input in <td> if onclick  
        myTd.addEventListener("click", 
            function(e){
                myInput = document.createElement("input");
                myInput.addEventListener("blur", 
                    function(){
                        //write ti localStorage as "id of td" = "value of input"
                        localStorage.setItem(myInput.parentNode.getAttribute("id"), myInput.value);
                        //kill <input/> 
                        myInput.remove();
                    });
                e.target.appendChild(myInput);
                //var cellID = this.getAttribute("id");
                //var myF = function(i,j){rowNum = i; cellNum = j;
                //console.log("rowNum = " + rowNum + "  cellNum = "+ cellNum);};
                
                e.target.childNodes[0].focus();
                
            });
        //end adding
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
function setNameCol(i){
    if (i<26) {return getChar(i);}
    else if (i<676){return getChar(Math.floor(i/26)-1)+getChar(i%26);}
    else {var x1 = Math.floor(i/676);
          var x2 = Math.floor((i%676)/26);
          var x3 = i - x1*676 - x2*26;
        return getChar(x1-1)+
        getChar(x2)+getChar(x3);}
}

function setData(){
this.getAttribute("id");
// Сохранение значения
//localStorage.setItem("", "Значение")
// Получение значения
//localStorage.getItem("Ключ")
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
function addRow(){
    // Find a <table> element with class="visible":
    var table = document.getElementsByClassName("visible")[0];
    // Create an empty <tr> element and add it to the last position of <table>:
    var row = table.insertRow(++numRow);     
    // Insert a new cells (<td>) :
    var cell = row.insertCell(0);
    node = document.createTextNode(numRow);
    cell.appendChild(node);
    for (var i = 1; i < numCol; i++) {
        var cell = row.insertCell(i);
    }
console.log("row added? " + numRow);
}