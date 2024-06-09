import axios from "../components/utils/axios";
import TodoList from "../types/TodoList";

const deleteTodoLists = async (id: string): Promise<TodoList[]> => {
  const response = await axios.delete(`/todo-lists/${id}`);
  return response.data;
};
export default deleteTodoLists;
