import axios from "../components/utils/axios";

const signin = async (credential: string, password: string): Promise<any> => {
  const requestData = {
    credential,
    password,
  };
  const response = await axios.post(`/auth/signin`, requestData);
  return response.data;
};
export default signin;
