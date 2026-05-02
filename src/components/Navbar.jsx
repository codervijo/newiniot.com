import { AppBar, Toolbar, Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";

const links = [
  { label: "Home", to: "/" },
  { label: "Tools", to: "/tools" },
  { label: "Updates", to: "/updates" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "text.primary",
              mr: 2,
            }}
          >
            <MemoryIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              NewInIoT
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
            {links.map((l) => {
              const active =
                l.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.to);
              return (
                <Button
                  key={l.to}
                  component={RouterLink}
                  to={l.to}
                  size="small"
                  sx={{
                    color: active ? "primary.main" : "text.secondary",
                    fontWeight: 600,
                    "&:hover": { color: "text.primary", bgcolor: "transparent" },
                  }}
                >
                  {l.label}
                </Button>
              );
            })}
          </Box>
          <Button
            component={RouterLink}
            to="/tools"
            variant="contained"
            size="small"
          >
            Open tools
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}