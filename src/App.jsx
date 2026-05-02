import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ToolsIndex from "./pages/ToolsIndex";
import MqttCostTool from "./pages/MqttCostTool";
import BatteryLifeTool from "./pages/BatteryLifeTool";
import UpdatesIndex from "./pages/UpdatesIndex";
import UpdatePage from "./pages/UpdatePage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/mqtt-cost" element={<MqttCostTool />} />
          <Route path="/tools/battery-life" element={<BatteryLifeTool />} />
          <Route path="/updates" element={<UpdatesIndex />} />
          <Route path="/updates/:slug" element={<UpdatePage />} />
          {/* Legacy slug like /esp32-updates */}
          <Route path="/esp32-updates" element={<UpdatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}