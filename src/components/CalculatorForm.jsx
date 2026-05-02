import { Card, CardContent, Typography, Stack, TextField, MenuItem, Box } from "@mui/material";

export default function CalculatorForm({ title, fields, values, onChange }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          Inputs
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Stack spacing={2}>
          {fields.map((f) => (
            <Box key={f.name}>
              <TextField
                fullWidth
                size="small"
                label={f.label}
                value={values[f.name] ?? ""}
                onChange={(e) =>
                  onChange(f.name, f.select ? e.target.value : e.target.value)
                }
                type={f.select ? "text" : "number"}
                select={!!f.select}
                helperText={f.helper}
                InputProps={f.adornment ? { endAdornment: <Box sx={{ color: "text.secondary", fontSize: 13, ml: 1 }}>{f.adornment}</Box> } : undefined}
              >
                {f.select &&
                  f.options.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}