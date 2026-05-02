import { useMemo, useState } from "react";
import { Container, Grid, Typography, Box, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CalculatorForm from "../components/CalculatorForm";
import ResultPanel from "../components/ResultPanel";
import BarChart from "../components/BarChart";

const fields = [
  { name: "capacity", label: "Battery capacity", adornment: "mAh" },
  { name: "voltage", label: "Voltage", adornment: "V" },
  { name: "txPerHour", label: "Transmissions per hour" },
  { name: "txDurationMs", label: "TX duration", adornment: "ms" },
  { name: "activeCurrent", label: "Active current", adornment: "mA" },
  { name: "sleepCurrent", label: "Sleep current", adornment: "µA" },
];

export default function BatteryLifeTool() {
  const [values, setValues] = useState({
    capacity: 2000,
    voltage: 3.7,
    txPerHour: 6,
    txDurationMs: 250,
    activeCurrent: 80,
    sleepCurrent: 10,
  });

  const onChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const calc = useMemo(() => {
    const capacity = Number(values.capacity) || 0; // mAh
    const txPerHour = Number(values.txPerHour) || 0;
    const txDurationMs = Number(values.txDurationMs) || 0;
    const activeCurrent = Number(values.activeCurrent) || 0; // mA
    const sleepCurrentMa = (Number(values.sleepCurrent) || 0) / 1000; // µA -> mA

    // Hourly: active time fraction
    const activeMsPerHour = txPerHour * txDurationMs;
    const activeHoursPerHour = activeMsPerHour / 3_600_000;
    const sleepHoursPerHour = 1 - activeHoursPerHour;

    // Average current draw (mA)
    const avgCurrent =
      activeCurrent * activeHoursPerHour + sleepCurrentMa * sleepHoursPerHour;

    const lifeHours = avgCurrent > 0 ? capacity / avgCurrent : 0;
    const lifeDays = lifeHours / 24;
    const lifeMonths = lifeDays / 30;
    const lifeYears = lifeDays / 365;

    // Energy split (mAh per day)
    const activeMah = activeCurrent * activeHoursPerHour * 24;
    const sleepMah = sleepCurrentMa * sleepHoursPerHour * 24;

    return { avgCurrent, lifeDays, lifeMonths, lifeYears, activeMah, sleepMah };
  }, [values]);

  const fmt = (n, d = 1) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: d }).format(n);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={RouterLink} to="/tools" underline="hover" color="inherit">Tools</MuiLink>
        <Typography color="text.primary">Battery Life Calculator</Typography>
      </Breadcrumbs>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 } }}>IoT Battery Life Calculator</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
          Predict battery life from duty cycle. Assumes ideal battery chemistry — real-world life will be lower due to self-discharge, temperature, and aging.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CalculatorForm title="Device profile" fields={fields} values={values} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ResultPanel
            title="Estimated battery life"
            results={[
              { label: "Average current", value: fmt(calc.avgCurrent, 3), unit: "mA" },
              { label: "Life", value: fmt(calc.lifeDays, 0), unit: "days" },
              { label: "Life", value: fmt(calc.lifeMonths, 1), unit: "months" },
              { label: "Life", value: fmt(calc.lifeYears, 2), unit: "years" },
            ]}
            chart={
              <Box>
                <Typography variant="overline" color="text.secondary">Daily energy split (mAh)</Typography>
                <Box sx={{ mt: 1 }}>
                  <BarChart
                    data={[
                      { label: "Active", value: calc.activeMah, color: "primary.main" },
                      { label: "Sleep", value: calc.sleepMah },
                    ]}
                    formatValue={(v) => fmt(v, 3) + " mAh"}
                  />
                </Box>
              </Box>
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}