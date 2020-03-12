//Welcome to the in-class challenge!

let myAlphabet = ['A', 'B', 'C', 'D','E','F','G'];

// 1. What is the length of the array?

console.log("1) The length of the array is "+ myAlphabet.length);

// 2. Write a function called myAlphabetLength which console.logs the length of the array

function myAlphabetLength() {
  console.log("2) The length of the array is "+ myAlphabet.length);
}

myAlphabetLength();

// 3. Within the function also use an if-conditional statement that checks if the number of items within the array are less than 4
function myAlphabetLengthWithIf() {
  if (myAlphabet.length<4) {
    console.log("3) There are less than 4 elements in the array.");
  }
  else {
    console.log("3) There are 4 or more elements in the array.");
  }
  console.log("3) The length of the array is "+ myAlphabet.length);
}

myAlphabetLengthWithIf();

// 4. Declare and initialize an array called 'colors' with 5 different string values representing the names of 5 colors of your choosing

let colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];

// 5.  Console.log each item in the array

for (let i = 0; i<colors.length; i++) {
  console.log("5) " + colors[i]);
}

// 6. Declare an empty string variable called 'text'. Each time you console.log a color from the above challenge number 2, add your color to this variable.

let text = '';
for (let i = 0; i<colors.length; i++) {
  console.log("6) " + colors[i]);
  text+=colors[i]+" ";
}

console.log(text);


//7. Create a div in the index.html with a unique id called whatever you want. Display the contents of your text variable to this div. Now you should have a list of 5 colors visible on your website.
// push your edits to github!!
