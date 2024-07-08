const crypto = require('crypto');
import dotenv from 'dotenv';

dotenv.config();

// Algorithm used for encryption and decryption
const algorithm = 'aes-256-ctr';
// Secret key derived from environment variable, converted to Buffer
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

/**
 * Encrypts a given text using AES-256-CTR algorithm.
 * The function generates a random initialization vector (IV) for each encryption,
 * concatenates the IV and the encrypted text, and returns the result as a hex string.
 *
 * @param {string} text - The plaintext to encrypt.
 * @returns {string} The encrypted text as a hex string, including the IV.
 */
export const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv); // Create a cipher instance
    const encrypted = Buffer.concat([cipher.update(text.toString()), cipher.final()]); // Encrypt the text
    return iv.toString('hex') + ':' + encrypted.toString('hex'); // Return IV and encrypted text as hex string
};

/**
 * Decrypts a given text using AES-256-CTR algorithm.
 * The function splits the input string into the IV and the encrypted text,
 * and then decrypts the text using the IV.
 *
 * @param {string} hash - The encrypted text as a hex string, including the IV.
 * @returns {string} The decrypted plaintext.
 */
export const decrypt = (hash) => {
    const parts = hash.split(':'); // Split the input into IV and encrypted text
    const iv = Buffer.from(parts.shift(), 'hex'); // Extract the IV from the input
    const encryptedText = Buffer.from(parts.join(':'), 'hex'); // Extract the encrypted text

    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv); // Create a decipher instance

    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]); // Decrypt the text

    return decrypted.toString(); // Return the decrypted text
};
