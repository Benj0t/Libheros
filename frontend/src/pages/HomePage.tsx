import { useEffect, useState } from "react";
import authMe from "../requests/authMe";
import { useNavigate } from "react-router";
import LeftSidebar from "../components/LeftSidebar";
import { Grid } from "@mui/material";
import TodoList from "../types/TodoList";
import MainContent from "../components/MainContent";

const HomePage: React.FC = () => {
  const [selectedTodoList, setSelectedTodoList] = useState<TodoList | null>(
    null
  );
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await authMe();
      } catch (err) {
        navigate("/auth");
      }
    };
    fetchData();
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <LeftSidebar setTodoList={setSelectedTodoList} />
      </Grid>
      <Grid item xs={5}>
        <MainContent TodoList={selectedTodoList} />
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default HomePage;
