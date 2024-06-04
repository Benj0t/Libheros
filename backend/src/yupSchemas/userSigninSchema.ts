import * as yup from 'yup';

import { passwordRegex } from '../utils/regex';

import { validateEmail, validateUsername } from './loginDataValidation';

const userSigninSchema = yup
  .object({
    credential: yup
      .string()
      .test('email_or_username', 'Email / username is invalid', (value) => {
        return validateEmail(value) || validateUsername(value);
      })
      .required(),
    password: yup.string().matches(passwordRegex).required(),
  })
  .noUnknown();

export default userSigninSchema;
