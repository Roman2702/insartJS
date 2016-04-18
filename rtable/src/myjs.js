//global variables
var numRow = 30, numCol = 30, numSheets = 3, maxNumCol = 26*26*26; 
var rowNum, cellNum;//coordinates of cell (still dosn't work)
var myTd, myTh, node, nameCol, myTr;
//clear localStorage
localStorage.clear();
function createTable(numSheet){
    var myInput;
    var myElement = document.getElementById("myTable");
//create a table in div id = myTable
var myTb = document.createElement("table");
var nameSheet = "sheet"+numSheet;
myTb.setAttribute("id", nameSheet);
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
        myTd.setAttribute("id",
            (setNameCol(j-1) + (i+1)));//set id for td
        /*myTd.setAttribute("id",
            ('$' + nameSheet + '$' + setNameCol(j-1) +
            '$' + (i+1)));//set id for td*/
        myTd.setAttribute("class","notIndex");
        //add input in <td> if onclick  
        myInputEvent(myTd);
        //end adding
        myTr.appendChild(myTd);
    }
    myTb.appendChild(myTr);
}
myElement.appendChild(myTb);
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
    var nameSheet = table.getAttribute('id');
    // Create an empty <tr> element and add it to the last position of <table>:
    var lastRowNumber = table.rows.length;
    var row = table.insertRow(lastRowNumber);     
    // Insert a new cells (<td>) :
    var cell = row.insertCell(0);
    node = document.createTextNode(lastRowNumber);
    cell.appendChild(node);
    var numCol = table.rows[0].cells.length;
    for (var i = 1; i < numCol; i++) {
        var cell = row.insertCell(i);
        cell.setAttribute("id",
            (setNameCol(i-1) + lastRowNumber));//set id for td
        /*cell.setAttribute("id",
            ('$' + nameSheet + '$' + setNameCol(i-1) +
            '$' + lastRowNumber));//set id for td*/
        cell.setAttribute("class","notIndex");
        myInputEvent(cell);
    }
}
function addCol(){
    // Find a <table> element with class="visible":
    var table = document.getElementsByClassName("visible")[0]; 
    var lastColNumber = table.rows[0].cells.length;
    var nameSheet = table.getAttribute('id');
    var myTh = document.createElement("th");
    var nameCol = setNameCol(lastColNumber-1);
    var node = document.createTextNode(nameCol);
    myTh.appendChild(node);
    table.rows[0].appendChild(myTh);
   
    var numRow = table.rows.length;
//    console.log(numRow);
    for (var i = 1; i < numRow; i++) {
        var cell = table.rows[i].insertCell(lastColNumber);
        cell.setAttribute("id",
            (setNameCol(lastColNumber-1) + i));//set id for td

        /*cell.setAttribute("id",
            ('$' + nameSheet + '$' + setNameCol(lastColNumber-1) +
            '$' + i));//set id for td*/
        cell.setAttribute("class","notIndex");
        myInputEvent(cell);
    }
}

function myInputEvent(cell){
    //add event on <input>
    cell.addEventListener("dblclick", 
            function(e){
                var keyValue = e.target.getAttribute("id");
                if (localStorage.getItem(keyValue)){
                    var oldValue = localStorage.getItem(keyValue);//e.target.innerHTML;
                    e.target.innerHTML="";
                } else {var oldValue ="";}
                myInput = document.createElement("input");
                myInput.value = oldValue;
                myInput.addEventListener("blur", 
                    function(){
                        //write to localStorage as "id of td" = "value of input"
                        
                        if (myInput.value) {
                            localStorage.setItem(keyValue, myInput.value);
                        }
                        //kill <input/> 
                        myInput.remove();
                        //write value in td
                        var strOfData = localStorage.getItem(keyValue);
                        if (strOfData){
                        if (strOfData.charAt(0) === '='){
                            e.target.innerHTML = parseFormula(strOfData);
                        }
                        else 
                        e.target.innerHTML = 
                        localStorage.getItem(keyValue);
                        }
                    });
                e.target.appendChild(myInput);
                //delegate focus in new <input>
                e.target.childNodes[0].focus();
                
            });
}
function parseFormula(strOfData){
    //except first symbol '=' and convert to upper case
    var str = strOfData.slice(1).toUpperCase();
    return eval(str.replace( /([A-Z]+\d+)/g, function (nameOfData){ 
        var table = document.getElementsByClassName("visible")[0];
        var nameOfCol = nameOfData.substr(0,nameOfData.search(/\d/));
        var numOfCol = getNumCol(nameOfCol);
        var numOfRow = parseInt(nameOfData.slice(nameOfData.search(/\d/)));
        if (numOfCol&&numOfRow){
            var x = table.rows[numOfRow].cells[numOfCol+1].innerText;}
            if (x) {return x} else {return 0}
        }));
}
/*function parseOfName(nameOfData){
    var table = document.getElementsByClassName("visible")[0];
    var nameOfCol = nameOfData.substr(0,nameOfData.search(/\d/));
    var numOfCol = getNumCol(nameOfCol);
    var numOfRow = parseInt(nameOfData.slice(nameOfData.search(/\d/)));
    if (numOfCol&&numOfRow){
    var x = table.rows[numOfRow].cells[numOfCol+1].innerText;}
    if (x) {return x} else {return 0}
}*/