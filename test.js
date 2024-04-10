const Number = "1234567890"
let x = ""
function mobile_no (){
   const y= ""
         x = Math. floor(Math. random() * (9 - 1 + 1)) + 1;
        // console.log(x);
    return x;
}
// console.log(x);
console.log(mobile_no())






function generateRandom10DigitNumber() {
    // Generate a random number between 1000000000 and 9999999999.
    const randomNumber = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
  
    // Return the random number.
    return randomNumber;
  }
  
  // Generate a random 10 digit number and print it to the console.
  const randomNumber = generateRandom10DigitNumber();
  console.log(randomNumber);