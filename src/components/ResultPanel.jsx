import { Card, CardContent, Typography, Box, Divider, Stack } from "@mui/material";

export default function ResultPanel({ title, results, chart }) {
  return (
    <Card sx={{ position: "sticky", top: 88 }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          Results
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Stack divider={<Divider flexItem />} spacing={2}>
          {results.map((r) => (
            <Box key={r.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Typography variant="body2" color="text.secondary">
                {r.label}
              </Typography>
              <Typography variant="h6" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {r.value}
                {r.unit && (
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                    {r.unit}
                  </Typography>
                )}
              </Typography>
            </Box>
          ))}
        </Stack>
        {chart && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            {chart}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}