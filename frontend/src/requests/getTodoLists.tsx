import axios from "../components/utils/axios";
import TodoList from "../types/TodoList";

const getTodoLists = async (): Promise<TodoList[]> => {
  const response = await axios.get(`/todo-lists`);
  return response.data;
};
export default getTodoLists;
