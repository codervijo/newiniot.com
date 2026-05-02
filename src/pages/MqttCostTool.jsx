import { useMemo, useState } from "react";
import { Container, Grid, Typography, Box, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CalculatorForm from "../components/CalculatorForm";
import ResultPanel from "../components/ResultPanel";
import BarChart from "../components/BarChart";

const PROVIDERS = {
  aws: { label: "AWS IoT Core", pricePerMillion: 1.0, name: "AWS IoT" },
  azure: { label: "Azure IoT Hub (S1)", pricePerMillion: 2.5, name: "Azure IoT" },
  custom: { label: "Custom broker", pricePerMillion: 0.3, name: "Custom" },
};

const fields = [
  { name: "messagesPerDay", label: "Messages per device per day", helper: "Combined inbound + outbound" },
  { name: "payloadBytes", label: "Payload size", adornment: "bytes" },
  { name: "devices", label: "Number of devices" },
  {
    name: "provider",
    label: "Provider",
    select: true,
    options: Object.entries(PROVIDERS).map(([value, v]) => ({ value, label: v.label })),
  },
];

function fmtNum(n) {
  return new Intl.NumberFormat().format(Math.round(n));
}
function fmtCurrency(n) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}
function fmtBytes(b) {
  if (b >= 1e12) return (b / 1e12).toFixed(2) + " TB";
  if (b >= 1e9) return (b / 1e9).toFixed(2) + " GB";
  if (b >= 1e6) return (b / 1e6).toFixed(2) + " MB";
  if (b >= 1e3) return (b / 1e3).toFixed(2) + " KB";
  return b + " B";
}

export default function MqttCostTool() {
  const [values, setValues] = useState({
    messagesPerDay: 144,
    payloadBytes: 256,
    devices: 10000,
    provider: "aws",
  });

  const onChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const calc = useMemo(() => {
    const messagesPerDay = Number(values.messagesPerDay) || 0;
    const payload = Number(values.payloadBytes) || 0;
    const devices = Number(values.devices) || 0;
    const provider = PROVIDERS[values.provider];

    const totalMessages = messagesPerDay * devices * 30;
    const totalBytes = totalMessages * payload;
    const cost = (totalMessages / 1_000_000) * provider.pricePerMillion;

    const breakdown = Object.entries(PROVIDERS).map(([key, p]) => ({
      label: p.name,
      value: (totalMessages / 1_000_000) * p.pricePerMillion,
      color: key === values.provider ? "primary.main" : undefined,
    }));

    return { totalMessages, totalBytes, cost, breakdown };
  }, [values]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={RouterLink} to="/tools" underline="hover" color="inherit">Tools</MuiLink>
        <Typography color="text.primary">MQTT Cost Calculator</Typography>
      </Breadcrumbs>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 } }}>MQTT Cost Calculator</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
          Estimate monthly messaging cost and bandwidth across major IoT brokers. Pricing is approximate — verify against your provider's calculator before purchasing.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CalculatorForm title="Fleet parameters" fields={fields} values={values} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ResultPanel
            title="Monthly estimate"
            results={[
              { label: "Total messages / month", value: fmtNum(calc.totalMessages) },
              { label: "Bandwidth", value: fmtBytes(calc.totalBytes) },
              { label: "Estimated cost", value: fmtCurrency(calc.cost) },
            ]}
            chart={
              <Box>
                <Typography variant="overline" color="text.secondary">Cost by provider</Typography>
                <Box sx={{ mt: 1 }}>
                  <BarChart data={calc.breakdown} formatValue={fmtCurrency} />
                </Box>
              </Box>
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}