const toCalculate = document.getElementById("display")
let finished = false

// incorporate keypresses from keyboard
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        reversePolish();
    } else if (key === 'Backspace') {
        toCalculate.value = toCalculate.value.slice(0, -1);
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// display function
function appendToDisplay(input) {
    if (finished) {
        clearDisplay();
        finished = false;
    }
    toCalculate.value += input;
}

// special buttons
function clearDisplay() {
    toCalculate.value = '';
}

function backspace() {
    toCalculate.value = toCalculate.value.slice(0, -1);
}


// Reverse Polish Notation Calculator (RPN)
// looks for the precedence of operators
function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

// calculation function
function applyOperator(op, b, a) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
}

// converts normal expression to reverse polish notation (shunting yard)
function infixToPostfix(expression) {
    let stack = []; // stack that contains operators and special characters
    let output = []; // output list that intially contains num vals and produces final rpn notation
    let tokens = expression.match(/-?\d+(\.\d+)?|\+|\-|\*|\/|\(|\)/g); // tokenize the expression
    // from "(2.1+2) * 1" => ["(", "2.1", "+", "2", ")", "*", "1"]

    tokens.forEach(token => {
        if (!isNaN(token)) { // pushes numerical values into output
            output.push(token);
        } else if (token === '(') { // enters the start of the parenthesis
            stack.push(token);
        } else if (token === ')') { // ends the parenthesis and pops the operators to add to the output
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); 
        } else { 
            // checks whether current token has higher precedence to push to output from the stack 
            while (stack.length && precedence(stack[stack.length - 1]) >= precedence(token)) {
                output.push(stack.pop());
            }
            stack.push(token); // pushes operator to stack
        }
    });

    // push all remaining operators to output
    while (stack.length) {
        output.push(stack.pop());
    }

    return output;
}

function evaluatePostfix(postfix) {
    let stack = [];

    postfix.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            // pops the top 2 numbers from the stack when encountering an operator
            let b = stack.pop();
            let a = stack.pop();
            // calculates with operation function from above
            stack.push(applyOperator(token, b, a));
        }
    });

    // returns the answer => only item in our stack
    return stack.pop();
}

function reversePolish() {
    let expression = toCalculate.value;

    try {
        let postfix = infixToPostfix(expression); // convert infix to RPN
        let result = evaluatePostfix(postfix); // compute RPN
        toCalculate.value = result;
    } catch (e) { //catch errors and send error code
        toCalculate.value = 'Error';
    }

    finished = true; // set boolean to true so calculator clears for next computation
}
