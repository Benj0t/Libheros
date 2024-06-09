import axios from "../components/utils/axios";
import TodoList from "../types/TodoList";

const deleteTasks = async (id: string): Promise<TodoList[]> => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};
export default deleteTasks;
