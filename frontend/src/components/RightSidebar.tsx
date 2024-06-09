import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import Task from "../types/Task";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteTask from "../requests/deleteTask";

interface Props {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const RightSidebar: React.FC<Props> = ({ selectedTask, setSelectedTask }) => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteTask = async () => {
    if (taskId) {
      try {
        await deleteTask(taskId);
        setIsDialogOpen(false);
        setTaskId(null);
        setSelectedTask(null);
      } catch (error) {
        console.error("Error deleting Todo list:", error);
      }
    }
  };
  const openDialog = (id: string) => {
    setTaskId(id);
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
    setTaskId(null);
  };
  return (
    <Drawer
      anchor="right"
      open={selectedTask !== null}
      variant="persistent"
      PaperProps={{ sx: { width: 300 } }} // Adjust the width as needed
    >
      <Box p={2} role="presentation">
        {selectedTask ? (
          <>
            <Typography variant="h6">Détails de la tâche</Typography>
            <Typography variant="body1">Nom: {selectedTask.name}</Typography>
            <Typography variant="body1">
              Description courte: {selectedTask.description_short}
            </Typography>
            <Typography variant="body1">
              Description longue: {selectedTask.description_long}
            </Typography>
            <Typography variant="body1">
              Date de création:{" "}
              {selectedTask.created_at
                ? new Date(selectedTask.created_at).toLocaleDateString()
                : ""}
            </Typography>
            <Typography variant="body1">
              Date limite:{" "}
              {selectedTask.deadline
                ? new Date(selectedTask.deadline).toLocaleDateString()
                : ""}
            </Typography>
            <Typography variant="body1">
              Statut: {selectedTask.finished ? "✅" : "❌"}
            </Typography>
            <IconButton
              aria-label="delete"
              onClick={() => openDialog(selectedTask.uuid)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <Typography variant="body1">
            Sélectionnez une tâche pour voir les détails
          </Typography>
        )}
      </Box>
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
            Êtes-vous sûr de vouloir supprimer cette tâche ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Non
          </Button>
          <Button onClick={handleDeleteTask} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default RightSidebar;
