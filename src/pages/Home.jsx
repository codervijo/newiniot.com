import { Box, Container, Typography, Button, Grid, Stack, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import tools from "../data/tools.json";
import updates from "../data/updates.json";
import ToolCard from "../components/ToolCard";

export default function Home() {
  const featured = tools.slice(0, 3);
  return (
    <Box>
      {/* Hero */}
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Chip label="For IoT engineers" size="small" sx={{ mb: 3 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 56 }, maxWidth: 820, lineHeight: 1.1 }}>
            Track what changed in IoT.<br />
            <Box component="span" sx={{ color: "primary.main" }}>Calculate what it costs.</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 3, maxWidth: 640, fontWeight: 400 }}>
            Interactive calculators for MQTT cost, battery life, and OTA bandwidth — plus structured update logs for the platforms you actually ship on.
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ mt: 4 }}>
            <Button component={RouterLink} to="/tools" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
              Use tools
            </Button>
            <Button component={RouterLink} to="/updates" variant="outlined" size="large">
              Browse updates
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Featured Tools */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeader eyebrow="Tools" title="Featured calculators" to="/tools" linkLabel="All tools" />
        <Grid container spacing={3}>
          {featured.map((t) => (
            <Grid item xs={12} md={4} key={t.id}>
              <ToolCard tool={t} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest Updates */}
      <Box sx={{ borderTop: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <SectionHeader eyebrow="Updates" title="Latest IoT platform updates" to="/updates" linkLabel="All updates" />
          <Grid container spacing={3}>
            {updates.map((u) => {
              const latest = u.timeline[0];
              return (
                <Grid item xs={12} md={6} key={u.slug}>
                  <Box
                    component={RouterLink}
                    to={`/updates/${u.slug}`}
                    sx={{
                      display: "block",
                      p: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      bgcolor: "background.default",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "border-color .15s",
                      "&:hover": { borderColor: "primary.main" },
                    }}
                  >
                    <Typography variant="overline" color="text.secondary">{u.name}</Typography>
                    <Typography variant="h6" sx={{ mt: 0.5 }}>{latest.version}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {latest.changes[0]}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 40 } }}>
          Stop guessing your IoT numbers.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 520, mx: "auto" }}>
          Plug in your fleet parameters and get a defensible estimate in seconds.
        </Typography>
        <Button component={RouterLink} to="/tools" variant="contained" size="large" sx={{ mt: 4 }} endIcon={<ArrowForwardIcon />}>
          Use tools
        </Button>
      </Container>
    </Box>
  );
}

function SectionHeader({ eyebrow, title, to, linkLabel }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4, flexWrap: "wrap", gap: 2 }}>
      <Box>
        <Typography variant="overline" color="primary.main">{eyebrow}</Typography>
        <Typography variant="h4">{title}</Typography>
      </Box>
      {to && (
        <Button component={RouterLink} to={to} endIcon={<ArrowForwardIcon />} size="small">
          {linkLabel}
        </Button>
      )}
    </Box>
  );
}