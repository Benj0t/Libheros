import { useEffect, useState } from "react";
import TodoList from "../types/TodoList";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import getTasksByListId from "../requests/getTasksByListId";
import Task from "../types/Task";

interface props {
  TodoList: TodoList | null;
}

const MainContent: React.FC<props> = ({ TodoList }) => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      if (TodoList != null) {
        try {
          const data = await getTasksByListId(TodoList.uuid);
          setTaskList(data);
        } catch (err) {
          console.log("An error occured", err);
        }
      }
    };
    fetchTasks();
  }, [TodoList]);
  console.log(TodoList);
  if (TodoList === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <p>Sélectionnez une liste de tâches</p>
      </Box>
    );
  } else {
    return (
      <Box height="100vh">
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {taskList.map((task) => (
                <TableRow key={task.uuid}>
                  <TableCell>Nom: {task.name}</TableCell>
                  <TableCell>Description: {task.description_short}</TableCell>
                  <TableCell>Détail: {task?.description_long}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
};
export default MainContent;
