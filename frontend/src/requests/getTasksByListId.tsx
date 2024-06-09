import axios from "../components/utils/axios";
import Task from "../types/Task";

const getTasksByListId = async (id: string): Promise<Task[]> => {
  const response = await axios.get(`/tasks/todo-list/${id}`);
  return response.data;
};
export default getTasksByListId;
