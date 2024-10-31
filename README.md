# RPN Calculator Application Documentation
---
## Introduction
The RPN Calculator Application is a web-based calculator that allows users to input standard mathematical expressions (in infix notation) and evaluates them using the Reverse Polish Notation (RPN) method. This application is designed to handle both simple and complex arithmetic expressions, including the use of parentheses, negative numbers, and decimals. The calculator supports real-time input via both the keyboard and clickable buttons, providing an intuitive and user-friendly interface.

## Installation and Usage
### Requirements
A modern web browser (Chrome, Firefox, Safari, Edge) is required to run the application.

### Installation
Clone or download the source code from the repository.
Open the ```index.html``` file in any browser to use the application.

### Usage
Buttons: Click the number and operator buttons to form an expression. Press ```=``` to evaluate.
Keyboard: Type your expression directly into the display using the keyboard, then press ```Enter``` to evaluate.

## Features
### Standard Arithmetic Operations
* The application can handle the basic addition, subtraction, multiplication, and division
* The application also handles the use of parentheses

### Numbers
* The application handles normal numbers (e.g. 1,2,3), decimals (e.g. 1.23), and negative numbers (e.g. -2,-5.2)

### Reverse Polish Notation (RPN)
* The application converts the regular expressions (e.g. 1+1*2) into postfix notation (e.g. 1 1 2 * +) using the Shunting-yard algorithm

### Single Computation
The application is designed to clear its display after each calculation is made
* This process is done by creating a boolean function that clears when the calculation has finished

### Input
* The application handles both button presses and keypresses on the keyboard
* Buttons are limited to the numbers 0-9, operators (+,-,/,*), and special buttons (```(```,```)```,```.```,```C```,```DEL```)

### Keyboard Support
* Users can also input their mathematical expressions using their keyboards
* All numerical values are handled accordingly (0-9)
* Operators are handled by pressing ```*``` (multiplication), ```+``` (addition), ```-``` (subtraction), ```/``` (division)
* Decimal point can be pressed using ```.``` (decimal point) keypress
* The ```C``` or ```clear``` button is handled by the Escape key on the keyboard
* The ```DEL``` function is handled by the Backspace key on the keyboard
* Lastly, the ```=``` button is handled by the Enter key on the keyboard

## Application Architecture

### Front-end
* The application is built using HTML, CSS, and JavaScript

### Components
* Display using the ```<input type="text">```
  * Gets updated as user adds input
* Buttons using ```<button>```
  * event listener updated using the ```appendToDisplay()``` function
  * key presses include 0-9, +, -, etc.

### Shunting-yard Algorithm
This algorithm is responsible for converting infix expressions to postfix (RPN). The core steps include:

* Tokenization:
   * Breaking the input into tokens (numbers, operators, parentheses).
* Operator Precedence Handling:
  * Using a stack to manage the order of operations (PEMDAS).
* Postfix Conversion:
  * Outputting the final postfix expression, which is then evaluated using a stack-based approach.

### Evaluation of Postfix Expression
Once converted to RPN, the application evaluates the expression using a stack. Numbers are pushed onto the stack, and operators pop two numbers from the stack to perform the calculation, pushing the result back onto the stack.

### Error Handling
The application provides basic error handling to prevent the evaluation of invalid expressions. Some of the common error scenarios include:

* Syntax Errors:
  * If the input expression is incomplete or contains invalid characters.
* Division by Zero:
  * When attempting to divide by zero, the calculator will return ```Infinity```.

## Workflow Example
### Input
``` (2 + 2 * 1) + 1 ```
### Tokenization
``` ["(", "2", "+", "2", "*", "1", ")", "+", "1"] ```
### Postfix Conversion
``` 2 2 1 * + 1 + ```
### Evaluation
* Push ```2``` to stack
* Push ```2``` to stack
* Push ```1``` to stack
* Apply ```*```
  * Pop ```2``` and ```1``` from the stack
  * Apply ``` 2 * 1 ```, result = ```2```
  * Push result or ```2``` back to stack
* Apply ```+```
  * Pop ```2``` and ```2``` from the stack
  * Apply ``` 2 + 2 ```, result = ```4```
  * Push result or ```4``` back to stack
* Push ```1``` to stack
* Apply ```+```
  * Pop ```4``` and ```1```
  * Result = ```5```
 
```ouput = 5```

  
