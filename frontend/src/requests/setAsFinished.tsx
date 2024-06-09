import axios from "../components/utils/axios";
import TodoList from "../types/TodoList";

const setAsFinished = async (id: string): Promise<TodoList[]> => {
  const response = await axios.put(`/tasks/${id}`, {
    finished: true,
  });
  return response.data;
};
export default setAsFinished;
