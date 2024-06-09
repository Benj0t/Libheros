import axios from "../components/utils/axios";
import TodoList from "../types/TodoList";

const createTodoList = async (name: string): Promise<TodoList> => {
  const response = await axios.post(`/todo-lists`, { name });
  return response.data;
};
export default createTodoList;
