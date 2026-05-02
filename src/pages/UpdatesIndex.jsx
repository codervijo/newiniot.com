import { Container, Typography, Grid, Box, Card, CardContent, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import updates from "../data/updates.json";

export default function UpdatesIndex() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" color="primary.main">Updates</Typography>
        <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 40 } }}>What changed in IoT</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 640 }}>
          Structured release notes for the platforms IoT developers ship on.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {updates.map((u) => {
          const latest = u.timeline[0];
          return (
            <Grid item xs={12} sm={6} key={u.slug}>
              <Card
                component={RouterLink}
                to={`/updates/${u.slug}`}
                sx={{ display: "block", textDecoration: "none", color: "inherit", height: "100%", transition: "border-color .15s", "&:hover": { borderColor: "primary.main" } }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6">{u.name}</Typography>
                    <Chip label={latest.version} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {u.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}