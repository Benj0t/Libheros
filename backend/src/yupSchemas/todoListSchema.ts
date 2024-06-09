import * as yup from 'yup';

const todoListSchema = yup
  .object({
    name: yup.string().min(3).max(100).required(),
  })
  .noUnknown();

export default todoListSchema;
