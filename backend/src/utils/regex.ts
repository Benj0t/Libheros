// Regular expression for validating passwords. It requires at least one lowercase letter, one uppercase letter, one digit, and one special character from the set @$!%*?&. The password must be at least 8 characters long.
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Regular expression for validating names. It allows uppercase and lowercase letters from both the basic Latin alphabet and with accents (À-ÿ), spaces, apostrophes, and hyphens.
export const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

// Regular expression for validating strings that contain only alphanumeric characters (letters and digits).
export const alnumRegex = /^[0-9a-zA-Z]+$/;
