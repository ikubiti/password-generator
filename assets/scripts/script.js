
// Assignment Code
var generateBtn = document.querySelector("#generate");
// Required for password selection and highlighting
var passwordText = document.querySelector('#password');

// Define the minimum criteria requirement (Variable minimum requirement)
var minimumCriteria = 1;
var minLength = 8;
var maxLength = 128;

// Define the Special characters Ascii set { !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~}
var special = [
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60,
  61, 62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126
];

// To hold user selected criteria
var selectedCriteria = [];
var passwordLength;

// Get the password length
let getPasswordLength = function () {
  // Get the user's desired length
  let ans = window.prompt('Welcome to the Secure Password Generator!\n\n'
      + `Please enter your desired password length(Min=${minLength}, Max=${maxLength}):`);

  // Convert String to a number
  let length = Number.parseInt(ans);
  // Check for valid entry or continue until a valid response is obtained
  if (!Number.isInteger(length) || length < minLength || length > maxLength) {
    window.alert(`"${ans}" IS NOT A VALID PASSWORD LENGTH!` +
      `\nIT MUST BE A NUMBER BETWEEN ${minLength} AND ${maxLength} INCLUSIVE!`);
    return getPasswordLength();
  }

  // Return valid password length
  return length;
}

// Get valid user Criteria
let getUserCriteria = function(userCriteria) {
  // Get the password length
  passwordLength = getPasswordLength();

  selectedCriteria = [];
  // iterate over the user criteria options
  var totalWeight = 0;
  for (aCriteria in userCriteria) {
      if (window.confirm(`Do you want to include ${aCriteria} characters?`)) {
          selectedCriteria.push(aCriteria);
          // Generate random weights
          userCriteria[aCriteria] = Math.floor(Math.random() * 10) + 4;
          totalWeight += userCriteria[aCriteria];
      } else {
          userCriteria[aCriteria] = 0;
      }
  }

  // Inform user of insufficient criteria selection
  if (selectedCriteria.length < minimumCriteria) {
      window.alert( `You selected "${selectedCriteria.length}" factors!!!` +
        `\nYOU NEED TO SELECT A MINIMUM OF ${minimumCriteria} CRITERIA!!!`);
      return getUserCriteria(userCriteria);
  }

  return totalWeight;
}

// Get a valid password character
let getRandomCharacter = function(start, length) {
  return String.fromCharCode(Math.floor(Math.random() * length) + start);
}

// Use the User Criteria to generate the random Password
let getValidPasswordSet = function (validCriteria, totalWeight) {
  let partLength = 0;
  // Allocate random space for each criterion => ensure every criterion gets truly represented
  for(let i = 0; i < selectedCriteria.length; i++) {
    if(i === selectedCriteria.length - 1){
      validCriteria[selectedCriteria[i]] = passwordLength - partLength;
    } else {
      let newWeight = validCriteria[selectedCriteria[i]] * passwordLength;
      validCriteria[selectedCriteria[i]] = Math.floor(newWeight / totalWeight);
      partLength += validCriteria[selectedCriteria[i]];      
    }
  }

  // The selected criteria
  let criteriaSelect = selectedCriteria.toString();
  // Now all conditions met to generate the password
  let newPassword = '';
  for (let i = 0; i < passwordLength; i++) {
    let aCriteria = selectedCriteria[Math.floor(Math.random() * selectedCriteria.length)];
    if (aCriteria == 'lowercase') {
      newPassword = newPassword + getRandomCharacter(97, 26);
    } else if(aCriteria == 'uppercase') {
      newPassword = newPassword + getRandomCharacter(65, 26);
    } else if(aCriteria == 'numeric') {
      newPassword = newPassword + getRandomCharacter(48, 10);
    } else {
      let aCharacter = special[Math.floor(Math.random() * special.length)];
      newPassword = newPassword + String.fromCharCode(aCharacter);
    }

    // Adjust possible Password Array
    if (--validCriteria[aCriteria] == 0) {
      let index = selectedCriteria.indexOf(aCriteria);
      selectedCriteria.splice(index, 1);
    }
  }

  // The generated password
  alert(`Your new secure password composed of
  ${criteriaSelect} characters with length ${passwordLength} is: \n${newPassword}`);
  return newPassword;
}

// The main function to control the password generation process
function generatePassword() {
  // Start with a blank User Criteria object
  let userCriteria = {
    numeric: 0,
    special: 0,
    uppercase: 0,
    lowercase: 0
  };

  // Generate the User Criteria
  let weightedSum = getUserCriteria(userCriteria);
  // Generate the secure password according to the user selected criteria
  return getValidPasswordSet(userCriteria, weightedSum);
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  passwordText.value = password;
}

// Select the password in the text area for highlighting
function makeSelection () {
  passwordText.select();
  // Copy the new Password to the clipboard for easy use
  navigator.clipboard.writeText(newPassword);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Added event listener to automatically select all text for new password
passwordText.addEventListener('click', makeSelection);
