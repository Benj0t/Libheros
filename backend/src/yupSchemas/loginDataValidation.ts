import * as yup from 'yup';

import { alnumRegex } from '../utils/regex';

export const validateEmail = (email: unknown): boolean => {
  return yup.string().email().required().isValidSync(email);
};

export const validateUsername = (name: unknown): boolean => {
  return yup
    .string()
    .min(3)
    .max(250)
    .matches(alnumRegex, 'Must be alphanumeric')
    .required()
    .isValidSync(name);
};
