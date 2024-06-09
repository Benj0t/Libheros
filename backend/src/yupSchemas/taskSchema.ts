import * as yup from 'yup';

const taskSchema = yup
  .object({
    name: yup.string().min(3).max(250).required(),
    description_short: yup.string().min(3).max(200).required(),
    description_long: yup.string().notRequired(),
    deadline: yup.date().required(),
    finished: yup.boolean().default(false),
  })
  .noUnknown();

export default taskSchema;
