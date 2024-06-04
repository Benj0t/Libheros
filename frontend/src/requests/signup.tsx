import axios from "../components/utils/axios";

const signup = async (
  email: string,
  username: string,
  firstname: string,
  lastname: string,
  password: string
): Promise<any> => {
  const requestData = {
    email,
    username,
    firstname,
    lastname,
    password,
  };
  const response = await axios.post(`/auth/signup`, requestData);
  console.log(response);
  return response.data;
};
export default signup;
