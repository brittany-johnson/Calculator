const buttons = document.getElementsByTagName("button");
const numberBtns = document.getElementsByClassName("num");
const operationBtns = document.getElementsByClassName("operation");

const equals = document.getElementById("equal")
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const negate = document.getElementById("negate");

let currentDisplay = [];
let constant1;
let constant2;
let operation;
let operationIsActive = false;
let total;

const evaluate = {
    '+': function (x,y) { return x + y},
    '-': function (x,y) { return x - y},
    '/': function (x,y) { return x / y},
    '*': function (x,y) { return x * y},
}

//TODO: 
    // add constant limit
    // add key press 
    // accessability



//everytime a number is pressed, add it to the current display array and the constant 1 or 2 array
    //if constant 1 is empty, add to constant 1 
    //if constant 2 is full, add to constant 2

//have different event listers for diff types of btns

function displayNums(btn) {
    clear.innerHTML = "C";
    if (operationIsActive) {
        display.innerHTML = "";
        currentDisplay = [];
        operationIsActive = false;
    }
    currentDisplay.push(btn.innerText);
    display.innerHTML = currentDisplay.join('');

    if (!constant1 || !operation) {
        constant1 = Number(currentDisplay.join(''));
    }
    else if (constant1) {
        constant2 = Number(currentDisplay.join(''));
    }
    console.log(constant1 + " " + constant2);
    
}

function setOperation(btn) {
    //when an operation is pressed, set the operation variable 
    evaluateOp();
    operationIsActive = true;
    operation = btn.innerText;
    console.log(operation);
}

function evaluateOp() {
    //when constant1,2 and operation is set, perform evaluation
    if (constant1 && constant2 && operation) {
        constant1 = evaluate[operation](constant1,constant2);
        total = constant1;
        constant2 = '';
        operation = '';
        console.log(total);
        
    }
}

function displayTotal() {
    evaluateOp();
    if (total) {
        display.innerHTML = total;
    }
}

function clearDisplay(btn) {
    display.innerHTML = "";
    currentDisplay = [];
    constant1 = '';
    constant2 = '';
    operation = '';
    operationIsActive = false;
    total = 0;
}

function negateNumber() {  
    if (currentDisplay[0] !== "-") {
        currentDisplay.unshift("-");
        display.innerHTML = currentDisplay.join('');
    } else {
        currentDisplay.shift();
        display.innerHTML = currentDisplay.join('');
    }
    if (!constant1 || !operation) {
        constant1 = Number(currentDisplay.join(''));
    }
    else if (constant1) {
        constant2 = Number(currentDisplay.join(''));
    }
}

for (let i = 0; i < numberBtns.length; i++) {
    const numberBtn = numberBtns[i];
    numberBtn.addEventListener("click", function(){displayNums(numberBtn)});
}

for (let i = 0; i < operationBtns.length; i++) {
    const operationBtn = operationBtns[i];
    operationBtn.addEventListener("click", function(){setOperation(operationBtn)});
}

equals.addEventListener("click", displayTotal);
clear.addEventListener("click", function(){clearDisplay(clear)});
negate.addEventListener("click", negateNumber);

