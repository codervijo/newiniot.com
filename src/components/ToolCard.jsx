import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ToolCard({ tool }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
          <Chip label={tool.category} size="small" variant="outlined" />
          {tool.comingSoon && <Chip label="Soon" size="small" color="default" />}
        </Box>
        <Typography variant="h6" gutterBottom>
          {tool.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tool.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={RouterLink}
          to={tool.path}
          endIcon={<ArrowForwardIcon />}
          disabled={tool.comingSoon}
          size="small"
        >
          {tool.comingSoon ? "Coming soon" : "Open tool"}
        </Button>
      </CardActions>
    </Card>
  );
}