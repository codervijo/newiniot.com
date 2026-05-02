import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material";

export default function UpdateTimeline({ items }) {
  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Card key={item.version}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
              <Typography variant="h6">{item.version}</Typography>
              <Chip label={new Date(item.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })} size="small" variant="outlined" />
            </Box>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {item.changes.map((c) => (
                <Typography key={c} component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {c}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}