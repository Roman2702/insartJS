//global variables
var numRow = 30,
    numCol = 30,
    numSheets = 3,
    maxNumCol = 26 * 26 * 26;
var rowNum, cellNum; //coordinates of cell (still dosn't work)
var myTd, myTh, node, nameCol, myTr;
var currentTd = 'A1';
//clear localStorage
localStorage.clear();

function createTable(numSheet) {
    //var myInput;
    var myElement = document.getElementById("myTable");
    //create a table in div id = myTable
    var myTb = document.createElement("table");
    var nameSheet = "sheet" + numSheet;
    myTb.setAttribute("id", nameSheet);
    //hide all sheets except 1st
    if (numSheet === 1) {
        myTb.setAttribute("class", "visible");
    } else {
        myTb.setAttribute("class", "hidden");
    }

    myTr = document.createElement("tr");
    //create 1st cell
    myTh = document.createElement("th");
    nameCol = "Sheet" + numSheet;
    node = document.createTextNode(nameCol);
    myTh.appendChild(node);
    myTr.appendChild(myTh);

    //create raw of th 
    for (var i = 0; i < numCol; i++) {
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
        node = document.createTextNode(i + 1);
        myTd.appendChild(node);
        myTr.appendChild(myTd);
        for (var j = 1; j <= numCol; j++) {
            myTd = document.createElement("td");
            myTd.setAttribute("id",
            ('$' + nameSheet + '$' + setNameCol(j-1) + '$' + (i+1))); //set id for td
            /*myTd.setAttribute("id",
                ('$' + nameSheet + '$' + setNameCol(j-1) +
                '$' + (i+1)));//set id for td like $sheet1$A$1*/
            myTd.setAttribute("class", "notIndex");
            //add input in <td> if onclick  
            myInputEvent(myTd);
            //end adding
            myTr.appendChild(myTd);
        }
        myTb.appendChild(myTr);
    }
    myElement.appendChild(myTb);
}

function setData() {
    this.getAttribute("id");
    // Сохранение значения
    //localStorage.setItem("", "Значение")
    // Получение значения
    //localStorage.getItem("Ключ")
}

//create sheets
function createSheets(numSheets) {
    for (var i = 1; i <= numSheets; i++) {
        createTable(i);
    }
}

//change vibility for all sheets ecsept numActiveSheet
function setVisible(numActiveSheet) {
    for (var i = 0; i < numSheets; i++) {
        if (i === (numActiveSheet - 1)) {
            document.getElementsByTagName("table")[i].setAttribute("class", "visible");
        } else {
            document.getElementsByTagName("table")[i].setAttribute("class", "hidden");
        }
    }
}
//add new sheet
function addSheet() {
    createTable(++numSheets);
    myElement = document.getElementById("sheetSwitch");
    var myBut = document.createElement("button");
    myBut.setAttribute("onclick", "setVisible(numSheets)");
    node = document.createTextNode("sheet" + numSheets);
    myBut.appendChild(node);
    myElement.appendChild(myBut);
}

function addRow() {
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
            ('$' + nameSheet + '$' + setNameCol(lastColNumber - 1) + i)); //set id for td
        /*cell.setAttribute("id",
            ('$' + nameSheet + '$' + setNameCol(i-1) +
            '$' + lastRowNumber));//set id for td*/
        cell.setAttribute("class", "notIndex");
        myInputEvent(cell);
    }
}

function addCol() {
    // Find a <table> element with class="visible":
    var table = document.getElementsByClassName("visible")[0];
    var lastColNumber = table.rows[0].cells.length;
    var nameSheet = table.getAttribute('id');
    var myTh = document.createElement("th");
    var nameCol = setNameCol(lastColNumber - 1);
    var node = document.createTextNode(nameCol);
    myTh.appendChild(node);
    table.rows[0].appendChild(myTh);

    var numRow = table.rows.length;
    //    console.log(numRow);
    for (var i = 1; i < numRow; i++) {
        var cell = table.rows[i].insertCell(lastColNumber);
        cell.setAttribute("id",
            ('$' + nameSheet + '$' + setNameCol(lastColNumber - 1) + i)); //set id for td

        /*cell.setAttribute("id",
            ('$' + nameSheet + '$' + setNameCol(lastColNumber-1) +
            '$' + i));//set id for td*/
        cell.setAttribute("class", "notIndex");
        myInputEvent(cell);
    }
}

function myInputEvent(cell) {
    var myInput;
    //add event on <input>
    cell.addEventListener("dblclick",
        function(e) {
            var keyValue = e.target.getAttribute("id");
            if (localStorage.getItem(keyValue)) {
                var oldValue = localStorage.getItem(keyValue); //e.target.innerHTML;
                e.target.innerHTML = "";
            } else {
                var oldValue = "";
            }
            myInput = document.createElement("input");
            myInput.value = oldValue;
            document.getElementById("stringOfFunction").innerText = oldValue;

            //duplicate of input value in stringOfFunction
            myInput.addEventListener("input", function() {
                var x = this.value;
                document.getElementById("stringOfFunction").innerText = x;
            });

            myInput.addEventListener("keypress", function(e) {
                if (e.keyCode === 13) {
                    myInput.blur();
                    //e.preventDefault();
                }
            });


            //for duplicating of stringOfFunction  value in input
            //remember last active td id
            currentTd = e.target.id;
            //console.log(currentTd);


            myInput.addEventListener("blur",
                function() {
                    //write to localStorage as "id of td" = "value of input"

                    if (myInput.value) {
                        localStorage.setItem(keyValue, myInput.value);
                    } else {localStorage.removeItem(keyValue);};
                    //kill <input/> 
                    myInput.remove();
                    //clear stringOfFunction
                    document.getElementById("stringOfFunction").innerText = '';


                    //write value in td
                    var strOfData = localStorage.getItem(keyValue);
                    if (strOfData) {
                        if (strOfData.charAt(0) === '=') {
                            e.target.innerHTML = parseFormula(strOfData);
                        } else
                            e.target.innerHTML =
                            localStorage.getItem(keyValue);
                    }
                myTableRefresh();
                });
            e.target.appendChild(myInput);
            //delegate focus in new <input>
            e.target.childNodes[0].focus();

        });
}

function parseFormula(strOfData) {
    //except first symbol '=' and convert to upper case
    var str = strOfData.slice(1).toUpperCase();
    try {
    return eval(str.replace(/([A-Z]+\d+)/g, function(nameOfData) {
        var table = document.getElementsByClassName("visible")[0];
        var nameOfCol = nameOfData.substr(0, nameOfData.search(/\d/));
        var numOfCol = getNumCol(nameOfCol);
        var numOfRow = parseInt(nameOfData.slice(nameOfData.search(/\d/)));
        if ((numOfCol + 1) && numOfRow) {
            var x = table.rows[numOfRow].cells[numOfCol + 1].innerText;
        }
        if (x) {
            return x
        } else {
            return 0
        }
    }));
}
catch(err){
    return 'Error!';
}
}

function stringOfFunctionEvent() {
    var myStringOfFunction = document.getElementById("stringOfFunction");
    myStringOfFunction.addEventListener("click",
        function(e) {
            var myInput;
            //console.log('stringOfFunctionEvent' + currentTd);
            var keyValue = currentTd;
            var myCurrentTd = document.getElementById(currentTd);
            if (localStorage.getItem(keyValue)) {
                var oldValue = localStorage.getItem(keyValue);
                //e.target.innerHTML="";
            } else {
                var oldValue = "";
            }
            var myInput = document.createElement("input");
            myInput.value = oldValue;
            //duplicate of stringOfFunction value in last active td
            myInput.addEventListener("input", function() {
                var x = this.value;
                myCurrentTd.innerText = x;
            });
            myInput.addEventListener("keypress", function(e) {
                if (e.keyCode === 13) {
                    myInput.blur();
                    //e.preventDefault();
                }
            });

            myInput.addEventListener("blur",
                function() {
                    //write to localStorage as "id of td" = "value of input"

                    if (myInput.value) {
                        localStorage.setItem(keyValue, myInput.value);
                    }
                    else {localStorage.removeItem(keyValue);};
                    //kill <input/> 
                    myInput.remove();
                    //clear stringOfFunction
                    myStringOfFunction.innerHTML = '';


                    //write value in td
                    var strOfData = localStorage.getItem(keyValue);
                    if (strOfData) {
                        if (strOfData.charAt(0) === '=') {
                            myCurrentTd.innerHTML = parseFormula(strOfData);
                        } else
                            myCurrentTd.innerHTML =
                            localStorage.getItem(keyValue);
                    }
                myTableRefresh();                  
                });


            myStringOfFunction.appendChild(myInput).setAttribute("id", "inputFormula");

            //delegate focus in new <input>
            myStringOfFunction.childNodes[0].focus();

        });
}
myTableRefresh = function () {     //  reCalculation all cells in active sheet
    var cell, myCell;    
    // Find a <table> element with class="visible":
    var table = document.getElementsByClassName("visible")[0];
    var numCol = table.rows[0].cells.length;
    var numRow = table.rows.length;
    for (var i = 1; i < numRow; i++) {
        for (var j = 1; j < numCol; j++) {
        
        cell = table.rows[i].cells[j];
        if (cell.innerText) {
            myCell = String(localStorage.getItem(cell.getAttribute('id')));
            if (myCell.charAt(0) === '=') {
                cell.innerHTML = parseFormula(myCell);
            }          
        }
        }
    }

        
}