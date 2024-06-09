import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import getTodoLists from "../requests/getTodoLists";
import TodoList from "../types/TodoList";
import deleteTodoList from "../requests/deleteTodoList";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import createTodoList from "../requests/createTodoList";

interface props {
  setTodoList: React.Dispatch<React.SetStateAction<TodoList | null>>;
}

const LeftSidebar: React.FC<props> = ({ setTodoList }) => {
  const [open, setOpen] = useState(false);
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [todoListId, setTodoListId] = useState<string | null>(null);
  const [newTodoListName, setNewTodoListName] = useState("");

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const todoListsData = await getTodoLists();
        setTodoLists(todoListsData);
      } catch (error) {
        console.error("Error fetching Todo lists:", error);
      }
    };

    fetchTodoLists();
  }, []);

  const handleDeleteTodoList = async () => {
    if (todoListId) {
      try {
        await deleteTodoList(todoListId);
        setTodoLists(
          todoLists.filter((todoList) => todoList.uuid !== todoListId)
        );
        setIsDialogOpen(false);
        setTodoListId(null);
      } catch (error) {
        console.error("Error deleting Todo list:", error);
      }
    }
  };

  const handleCreateTodoList = async () => {
    try {
      const newTodoList = await createTodoList(newTodoListName);
      setTodoLists([...todoLists, newTodoList]);
      setNewTodoListName("");
    } catch (error) {
      console.error("Error creating Todo list:", error);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const openDialog = (id: string) => {
    setTodoListId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTodoListId(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <div>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem>
            <TextField
              label="Nouvelle liste"
              value={newTodoListName}
              onChange={(e) => setNewTodoListName(e.target.value)}
              fullWidth
            />
            <Button
              onClick={handleCreateTodoList}
              variant="contained"
              color="primary"
            >
              Ajouter
            </Button>
          </ListItem>
          {todoLists.map((todoList) => (
            <ListItem key={todoList.uuid} onClick={() => setTodoList(todoList)}>
              <ListItemText primary={todoList.name} />
              <IconButton
                aria-label="delete"
                onClick={() => openDialog(todoList.uuid)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation de suppression"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cette liste de tâches ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Non
          </Button>
          <Button onClick={handleDeleteTodoList} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeftSidebar;
