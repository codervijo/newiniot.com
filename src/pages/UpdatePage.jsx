import { Container, Typography, Box, Breadcrumbs, Link as MuiLink, Card, CardContent, Grid } from "@mui/material";
import { Link as RouterLink, useParams, Navigate } from "react-router-dom";
import updates from "../data/updates.json";
import UpdateTimeline from "../components/UpdateTimeline";
import FAQAccordion from "../components/FAQAccordion";

export default function UpdatePage() {
  const { slug } = useParams();
  const update = updates.find((u) => u.slug === slug);
  if (!update) return <Navigate to="/updates" replace />;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={RouterLink} to="/updates" underline="hover" color="inherit">Updates</MuiLink>
        <Typography color="text.primary">{update.name}</Typography>
      </Breadcrumbs>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" color="primary.main">{update.name}</Typography>
        <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 40 } }}>What's New in {update.name}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 720 }}>
          {update.summary}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ mb: 2 }}>Release timeline</Typography>
          <UpdateTimeline items={update.timeline} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 88 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">Recommendation</Typography>
              <Typography variant="h6" sx={{ mb: 1.5 }}>Should you upgrade?</Typography>
              <Typography variant="body2" color="text.secondary">{update.shouldUpgrade}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>FAQ</Typography>
        <FAQAccordion items={update.faq} />
      </Box>
    </Container>
  );
}