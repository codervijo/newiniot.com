import { Container, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, md: 16 }, textAlign: "center" }}>
      <Typography variant="overline" color="primary.main">404</Typography>
      <Typography variant="h3" sx={{ mt: 1 }}>Page not found</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button component={RouterLink} to="/" variant="contained">Return home</Button>
      </Box>
    </Container>
  );
}