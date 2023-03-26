let input_stdin_array = "-32540";
let output;
//Write code here

let updatedInput = Number(input_stdin_array);

if (isNaN(updatedInput)) {
  if (typeof input_stdin_array == "string") {
    output = "This input is of type String.";
  }
} else if (typeof updatedInput == "number") {
  if (Number.isInteger(updatedInput)) {
    output = "This input is of type Integer.";
  } else if (!Number.isInteger(updatedInput)) {
    output = "This input is of type Float.";
  }
} else {
  output = "This is something else.";
}

console.log(output);
