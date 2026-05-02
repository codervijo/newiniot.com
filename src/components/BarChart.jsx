import { Box, Typography } from "@mui/material";

// Tiny no-dependency bar chart using MUI primitives.
export default function BarChart({ data, formatValue }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Box>
      {data.map((d) => (
        <Box key={d.label} sx={{ mb: 1.25 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">{d.label}</Typography>
            <Typography variant="caption" sx={{ fontVariantNumeric: "tabular-nums" }}>
              {formatValue ? formatValue(d.value) : d.value}
            </Typography>
          </Box>
          <Box sx={{ position: "relative", height: 8, bgcolor: "action.hover", borderRadius: 1, overflow: "hidden" }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                width: `${(d.value / max) * 100}%`,
                bgcolor: d.color || "primary.main",
                borderRadius: 1,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}