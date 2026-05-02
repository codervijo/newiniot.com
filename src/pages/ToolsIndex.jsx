import { Container, Typography, Grid, Box } from "@mui/material";
import tools from "../data/tools.json";
import ToolCard from "../components/ToolCard";

export default function ToolsIndex() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" color="primary.main">Tools</Typography>
        <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 40 } }}>
          Calculators for IoT engineers
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 640 }}>
          All tools run client-side. No accounts, no tracking — just the numbers.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {tools.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <ToolCard tool={t} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}