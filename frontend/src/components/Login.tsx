import React, { FormEvent, useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import signin from "../requests/signin";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
// import { notifyToasterError, notifyToasterSuccess } from "./utils/toaster";

interface LoginProps {
  switchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ switchToSignUp }) => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    // notifyToasterSuccess("Vous êtes connecté !");
    try {
      const response = await signin(credential, password);
      console.log(response);
      Cookies.set("jwt", response?.jwt);
      // notifyToasterSuccess("Vous êtes connecté !");
      navigate("/");
    } catch (err) {
      console.log(err);
      // notifyToasterError("Identifiants introuvables.");
    }
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmitForm}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
          <Button
            onClick={switchToSignUp}
            fullWidth
            variant="text"
            sx={{ mt: 1, mb: 2 }}
          >
            Pas de compte ? Inscrivez-vous
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
