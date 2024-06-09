import { Box } from "@mui/material";

const NoMatch: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "45%",
        left: "35%",
        textAlign: "center",
        fontSize: "60px", // Taille du texte
        fontWeight: "bold", // Gras
      }}
    >
      404 - Page Not Found !
    </Box>
  );
};

export default NoMatch;
