import axios from "../components/utils/axios";
import Task from "../types/Task";
import TodoList from "../types/TodoList";

interface CreateTaskInteface {
  newTaskName: string;
  todoList: TodoList;
  newTaskDescriptonShort: string;
  newTaskDescriptonLong?: string;
  newTaskDeadline: Date;
}

const createTask = async (payload: CreateTaskInteface): Promise<Task> => {
  const isoDate = payload.newTaskDeadline.toISOString();

  const formattedDate = isoDate.slice(0, 19).replace("T", " ");
  const sendPayload = {
    list_id: payload.todoList.uuid,
    name: payload.newTaskName,
    description_short: payload.newTaskDescriptonShort,
    description_long: payload?.newTaskDescriptonLong,
    deadline: formattedDate,
  };
  const response = await axios.post(`/tasks`, sendPayload);
  return response.data;
};
export default createTask;
