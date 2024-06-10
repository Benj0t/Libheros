import axios from "../components/utils/axios";
import TodoList from "../types/TodoList";

const setAsRunning = async (id: string): Promise<TodoList[]> => {
  const response = await axios.put(`/tasks/${id}`, {
    finished: false,
  });
  return response.data;
};
export default setAsRunning;
