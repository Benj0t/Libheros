import * as yup from 'yup';

import { alnumRegex, nameRegex, passwordRegex } from '../utils/regex';

const userSignupSchema = yup
  .object({
    email: yup.string().email().required(),
    username: yup.string().min(3).max(250).matches(alnumRegex, 'Must be alphanumeric').required(),
    firstname: yup.string().min(2).max(250).matches(nameRegex, 'Invalid first name').required(),
    lastname: yup.string().min(1).max(250).matches(nameRegex, 'Invalid last name').required(),
    password: yup.string().matches(passwordRegex).required(),
  })
  .noUnknown();

export default userSignupSchema;
