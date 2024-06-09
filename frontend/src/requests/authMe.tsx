import axios from "../components/utils/axios";
import User from "../types/User";

const authMe = async (): Promise<Omit<User, "password">> => {
  const response = await axios.get(`/auth/me`);
  return response.data;
};
export default authMe;
