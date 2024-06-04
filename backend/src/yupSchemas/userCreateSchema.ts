import * as yup from 'yup';

import { alnumRegex, nameRegex, passwordRegex } from '../utils/regex';

// Yup Schema used to validate User creation
const userCreateSchema = yup
  .object({
    uuid: yup.string().uuid().required(),
    email: yup.string().email().required(),
    username: yup.string().min(3).max(250).matches(alnumRegex, 'Must be alphanumeric').required(),
    firstname: yup.string().min(2).max(250).matches(nameRegex, 'Invalid first name').required(),
    lastname: yup.string().min(1).max(250).matches(nameRegex, 'Invalid last name').required(),
    password: yup.string().matches(passwordRegex).required(),
  })
  .noUnknown();

export default userCreateSchema;
