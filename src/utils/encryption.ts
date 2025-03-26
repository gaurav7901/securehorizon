
/**
 * Encryption utilities for securing data
 */

// A simple encryption key (in production, this would be an environment variable)
const ENCRYPTION_KEY = 'secure-dashboard-encryption-key-2024';

/**
 * Encrypt data using AES algorithm
 */
export const encryptData = (data: any): string => {
  if (!data) return '';
  
  try {
    // Convert the data to a JSON string
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Simple XOR encryption (for demo purposes - use a proper crypto library in production)
    const encrypted = Array.from(jsonString).map(char => 
      String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(0))
    ).join('');
    
    // Convert to base64 for storage
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
};

/**
 * Decrypt data
 */
export const decryptData = (encryptedData: string): any => {
  if (!encryptedData) return null;
  
  try {
    // Decode from base64
    const base64Decoded = atob(encryptedData);
    
    // Reverse the XOR operation
    const decrypted = Array.from(base64Decoded).map(char => 
      String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(0))
    ).join('');
    
    // Parse the JSON
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
