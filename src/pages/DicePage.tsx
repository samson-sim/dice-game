import { Box, Container } from "@mui/material";
import { BetPanel, GameBoard } from "../games/dice";

export default function DicePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        py: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <BetPanel />
          <GameBoard />
        </Box>
      </Container>
    </Box>
  );
}
