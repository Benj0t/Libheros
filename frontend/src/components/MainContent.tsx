import { useEffect, useState } from "react";
import TodoList from "../types/TodoList";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import getTasksByListId from "../requests/getTasksByListId";
import Task from "../types/Task";
import createTask from "../requests/createTask";
import setAsFinished from "../requests/setAsFinished";

interface props {
  todoList: TodoList | null;
  selectedTask: Task | null;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const MainContent: React.FC<props> = ({ todoList, selectedTask, setTask }) => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescriptonShort, setNewTaskDescriptionShort] = useState("");
  const [newTaskDescriptonLong, setNewTaskDescriptionLong] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState<Date>(
    new Date(Date.now())
  );

  useEffect(() => {
    const fetchTasks = async () => {
      if (todoList != null) {
        try {
          const data = await getTasksByListId(todoList.uuid);
          setTaskList(data);
        } catch (err) {
          console.log("An error occured", err);
        }
      }
    };
    fetchTasks();
  }, [todoList, selectedTask]);

  const handleFinishedTask = async (id: string) => {
    try {
      await setAsFinished(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTask = async () => {
    try {
      if (todoList != null) {
        const newTask = await createTask({
          newTaskName,
          todoList,
          newTaskDescriptonShort,
          newTaskDescriptonLong,
          newTaskDeadline,
        });
        setTaskList([...taskList, newTask]);
        setNewTaskName("");
      }
    } catch (error) {
      console.error("Error creating Todo list:", error);
    }
  };
  if (todoList === null) {
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
        <Box p={2} mb={2}>
          <TextField
            label="Nom de la tâche"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Description courte"
            value={newTaskDescriptonShort}
            onChange={(e) => setNewTaskDescriptionShort(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Description longue"
            value={newTaskDescriptonLong}
            onChange={(e) => setNewTaskDescriptionLong(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Date limite"
            type="date"
            value={newTaskDeadline.toISOString().slice(0, 10)}
            onChange={(e) => setNewTaskDeadline(new Date(e.target.value))}
            fullWidth
            variant="outlined"
          />
          <Button
            onClick={handleCreateTask}
            variant="contained"
            color="primary"
          >
            Créer une tâche
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {taskList.map((task) => (
                <TableRow key={task.uuid} onClick={() => setTask(task)}>
                  <TableCell>Nom: {task.name}</TableCell>
                  <TableCell>Description: {task.description_short}</TableCell>
                  <TableCell>Détail: {task?.description_long}</TableCell>
                  <TableCell>
                    Date limite:
                    {task.deadline
                      ? new Date(task?.deadline).toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell>Statut: {task?.finished ? "✅" : "❌"}</TableCell>
                  <Button
                    onClick={() => handleFinishedTask(task.uuid)}
                    color="primary"
                  >
                    Terminé
                  </Button>
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
