const CryptoJS = require("crypto-js");

function encryptMessage(message, secretKey) {
  const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  return ciphertext;
}

function decryptMessage(ciphertext, secretKey) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
  return originalMessage;
}

if (process.argv.length < 4) {
  console.error("Please provide the secret key and the message as arguments.");
  process.exit(1);
}

const command = process.argv[2];
const secretKey = process.argv[3];

if (command === "encrypt") {
  const message = process.argv.slice(4).join(" ");
  const encryptedMessage = encryptMessage(message, secretKey);
  console.log("Encrypted Message:", encryptedMessage);
} else if (command === "decrypt") {
  const ciphertext = process.argv[4];
  const decryptedMessage = decryptMessage(ciphertext, secretKey);
  console.log("Decrypted Message:", decryptedMessage);
} else {
  console.error("Invalid command. Use 'encrypt' or 'decrypt'.");
  process.exit(1);
}
