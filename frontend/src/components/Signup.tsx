import React, { FormEvent, useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import signup from "../requests/authSignup";

interface SignUpProps {
  switchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    // notifyToasterSuccess("Vous êtes connecté !");
    try {
      const response = await signup(
        email,
        username,
        firstname,
        lastname,
        password
      );
      console.log(response);
      switchToLogin();
      // notifyToasterSuccess("Vous êtes connecté !");
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
          S'inscrire
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="Prénom"
            name="firstname"
            autoComplete="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Nom de famille"
            name="lastname"
            autoComplete="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
          <Button
            onClick={switchToLogin}
            fullWidth
            variant="text"
            sx={{ mt: 1, mb: 2 }}
          >
            Vous avez déjà un compte ? Connectez-vous
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
