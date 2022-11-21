// Define the Lowercase Ascii set {abcdefghijklmnopqrstuvwxyz}
let lowercase = [
  97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
  113, 114, 115, 116, 117, 118, 119, 120, 121, 122
];

// Define the Uppercase Ascii set {ABCDEFGHIJKLMNOPQRSTUVWXYZ}
let uppercase = [
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90
];

// Define the Numeric Ascii set {0123456789}
let numeric = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

// Define the Special characters Ascii set { !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~}
let special = [
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60,
  61, 62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126
];

//  Generate the string from an array of Ascii code characters
let generateString = function(arraySet){
  let newWord = '';
  for(let i = 0; i < arraySet.length; i++){
    newWord = newWord + String.fromCharCode(arraySet[i]);
  }

  return newWord;
}

// Get the password length
let getPasswordLength = function () {
  // Get the user's desired length
  let ans = window.prompt(
      'Welcome to the Secure Password Generator!\n\n'
      + 'Please enter your desired password length(Min=8, Max=128): '
  );

  // Convert String to a number
  let length = Number.parseInt(ans);
  // Check for valid entry or continue until a valid response is obtained
  if (!Number.isInteger(length) || length < 8 || length > 128) {
    window.alert(
      `"${ans}" IS NOT A VALID PASSWORD LENGTH!` +
      `\nIT MUST BE A NUMBER BETWEEN 8 AND 128 INCLUSIVE!`
    );
    return getPasswordLength();
  }

  // Return valid password length
  return ans;
}

// Get the password requirements
let confirmCriteria = function(requirement) {
  // Criteria weight To determine number of characters for each requirement
  let weight = 0;

  // Get the user's criteria input
  if (window.confirm(`Do you want to include ${requirement} characters?`)) {
    // Generate random weights
    weight = Math.floor(Math.random() * 4) + 4;
  }

  // Return the Criteria's weight
  return weight;
}

// Get valid user Criteria
let getUserCriteria = function(userCriteria) {
  // Check for minium Criteria Selection
  let minCriteria = 0;

  // Generate prompts to obtain user password Criteria
  for(aCriteria in userCriteria){
    let ans;
    if(aCriteria == 'passwordLength'){
      ans = getPasswordLength();
    } else {
      ans = confirmCriteria(aCriteria);
      if(ans){
        minCriteria++;
      }
    }

    userCriteria[aCriteria] = ans;
  }

  if(!minCriteria){
    // Inform user of insufficient criteria selection
    window.alert(`You selected ${minCriteria} criteria factors!!!`
    + `\nYOU NEED TO SELECT A MINIMUM OF ONE CRITERION!`);
    return getUserCriteria(userCriteria);
  }

  return;
}


// The main function to control the password generation process
function generatePassword() {
  // Start with a blank User Criteria object
  let userCriteria = {
    passwordLength: 0,
    special: 0,
    uppercase: 0,
    numeric: 0,
    lowercase: 0,
  };

  // Generate the User Criteria
  getUserCriteria(userCriteria);

  return '';
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
