const input = require("readline-sync");

// Data Store
let accounts = [];
let accountNumber = 1001;

let showMenu = () => {
  console.log("\n BANK MANAGEMENT SYSTEM");
  console.log("1. Create Account");
  console.log("2. Deposit Money");
  console.log("3. Withdraw Money");
  console.log("4. Transfer Money");
  console.log("5. View Account");
  console.log("6. Exit");

  let choice = input.questionInt("Enter Your Choice = ");

  switch (choice) {
    case 1:
      createAccount();
      break;
    case 2:
      depositMoney();
      break;
    case 3:
      withdrawMoney();
      break;
    case 4:
      transferMoney();
      break;
    case 5:
      viewAccount();
      break;
    case 6:
      console.log("Thank You For Using Bank System");
      process.exit();
    default:
      console.log("Invalid Option");
      showMenu();
  }
};

// Create Account
let createAccount = () => {
  let name = input.question("Enter Your Name : ");
  let balance = input.questionFloat("Enter initial Amount = ");

  if (balance < 0 || isNaN(balance)) {
    console.log("Invalid Amount");
  } else {
    let account = {
      accountNumber: accountNumber,
      name: name,
      balance: balance,
    };
    accounts.push(account);
    console.log(
      `Account Created Successfully. Your Account Number is ${accountNumber}`,
    );
    accountNumber++;
  }
  showMenu();
};

// Deposit Money
let depositMoney = () => {
  let accNo = input.questionInt("Enter Account Number : ");
  let amount = input.questionFloat("Enter Amount to Deposit : ");
  let found = false;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountNumber === accNo) {
      if (amount > 0) {
        accounts[i].balance += amount;
        console.log("Deposit Successful");
      } else {
        console.log("Invalid Amount");
      }
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Account not Found");
  }
  showMenu();
};

// Withdraw Money
let withdrawMoney = () => {
  let accNo = input.questionInt("Enter Account Number : ");
  let amount = input.questionFloat("Enter Amount to Withdraw : ");
  let found = false;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountNumber === accNo) {
      if (amount > 0 && amount <= accounts[i].balance) {
        accounts[i].balance -= amount;
        console.log("Withdrawal Successful");
      } else {
        console.log("Invalid Amount or Insufficient Balance");
      }
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Account not Found");
  }
  showMenu();
};

// View Account
let viewAccount = () => {
  let accNo = input.questionInt("Enter Account Number : ");
  let found = false;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountNumber === accNo) {
      console.log("Account Details");
      console.log(`Account Number : ${accounts[i].accountNumber}`);
      console.log(`Account Holder Name : ${accounts[i].name}`);
      console.log(`Your Balance : ${accounts[i].balance}`);
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Account not found");
  }
  showMenu();
};

// Transfer Money
let transferMoney = () => {
  let fromAcc = input.questionInt("Enter Your Account Number = ");
  let toAcc = input.questionInt("Enter Receiver Account Number = ");
  let amount = input.questionFloat("Enter Amount = ");

  let sender = null;
  let receiver = null;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountNumber === fromAcc) sender = accounts[i];
    if (accounts[i].accountNumber === toAcc) receiver = accounts[i];
  }

  if (sender === null || receiver === null) {
    console.log("Sender or Receiver account not found");
  } else if (amount > 0 && sender.balance >= amount) {
    sender.balance -= amount;
    receiver.balance += amount;
    console.log("Transfer Successful");
  } else {
    console.log("Transfer Failed: Invalid Amount or Insufficient Balance");
  }
  showMenu();
};

showMenu();
