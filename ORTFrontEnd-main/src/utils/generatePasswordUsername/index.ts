export const generateUsername = (email:any) => {
  if (!email) return '';

  const namePart = email.split('@')[0];
  const randomDigits = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99

  return `${capitalizeFirstLetter(namePart)}${randomDigits}`;
};

export const generatePassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  const passwordLength = 8;

  // Start with a predefined pattern
  password += 'Abc@';

  // Fill the rest of the password randomly
  for (let i = 4; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

const capitalizeFirstLetter = (string:any) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
