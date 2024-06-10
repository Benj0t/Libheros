import { useEffect, useState } from "react";
import TodoList from "../types/TodoList";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import getTasksByListId from "../requests/getTasksByListId";
import Task from "../types/Task";
import createTask from "../requests/createTask";
import setAsFinished from "../requests/setAsFinished";
import setAsRunning from "../requests/setAsRunning";

interface props {
  todoList: TodoList | null;
  selectedTask: Task | null;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const MainContent: React.FC<props> = ({ todoList, selectedTask, setTask }) => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescriptionShort, setNewTaskDescriptionShort] = useState("");
  const [newTaskDescriptionLong, setNewTaskDescriptionLong] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState<Date>(
    new Date(Date.now())
  );
  const [showFinishedTasks, setShowFinishedTasks] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (todoList != null) {
        try {
          const data = await getTasksByListId(todoList.uuid);
          setTaskList(data);
        } catch (err) {
          console.log("An error occurred", err);
        }
      }
    };
    fetchTasks();
  }, [todoList, selectedTask, taskList]);

  const handleFinishedTask = async (id: string) => {
    try {
      await setAsFinished(id);
      setTaskList((prevTaskList) =>
        prevTaskList.map((task) =>
          task.uuid === id ? { ...task, finished: true } : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleRunningTask = async (id: string) => {
    try {
      await setAsRunning(id);
      setTaskList((prevTaskList) =>
        prevTaskList.map((task) =>
          task.uuid === id ? { ...task, finished: false } : task
        )
      );
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
          newTaskDescriptionShort,
          newTaskDescriptionLong,
          newTaskDeadline,
        });
        setTaskList([...taskList, newTask]);
        setNewTaskName("");
        setNewTaskDescriptionShort("");
        setNewTaskDescriptionLong("");
        setNewTaskDeadline(new Date(Date.now()));
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const runningTasks = taskList.filter((task) => !task.finished);
  const finishedTasks = taskList.filter((task) => task.finished);

  if (todoList === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>Sélectionnez une liste de tâches</Typography>
      </Box>
    );
  } else {
    return (
      <Box height="100vh" p={2}>
        <Box mb={2}>
          <TextField
            label="Nom de la tâche"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Description courte"
            value={newTaskDescriptionShort}
            onChange={(e) => setNewTaskDescriptionShort(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Description longue"
            value={newTaskDescriptionLong}
            onChange={(e) => setNewTaskDescriptionLong(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Date limite"
            type="date"
            value={newTaskDeadline.toISOString().slice(0, 10)}
            onChange={(e) => setNewTaskDeadline(new Date(e.target.value))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button
            onClick={handleCreateTask}
            variant="contained"
            color="primary"
          >
            Créer une tâche
          </Button>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Mes tâches en cours
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {runningTasks.map((task) => (
                  <TableRow key={task.uuid} onClick={() => setTask(task)}>
                    <TableCell>Nom: {task.name}</TableCell>
                    <TableCell>Description: {task.description_short}</TableCell>
                    <TableCell>Détail: {task.description_long}</TableCell>
                    <TableCell>
                      Date limite:
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell>Statut: {task.finished ? "✅" : "❌"}</TableCell>
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
        <Box mt={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" gutterBottom>
              Mes tâches terminées
            </Typography>
            <IconButton
              onClick={() => setShowFinishedTasks(!showFinishedTasks)}
            >
              {showFinishedTasks ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <Collapse in={showFinishedTasks}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {finishedTasks.map((task) => (
                    <TableRow key={task.uuid} onClick={() => setTask(task)}>
                      <TableCell>Nom: {task.name}</TableCell>
                      <TableCell>
                        Description: {task.description_short}
                      </TableCell>
                      <TableCell>Détail: {task.description_long}</TableCell>
                      <TableCell>
                        Date limite:
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString()
                          : ""}
                      </TableCell>
                      <TableCell>
                        Statut: {task.finished ? "✅" : "❌"}
                      </TableCell>
                      <Button
                        onClick={() => handleRunningTask(task.uuid)}
                        color="primary"
                      >
                        En cours
                      </Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Box>
      </Box>
    );
  }
};

export default MainContent;
