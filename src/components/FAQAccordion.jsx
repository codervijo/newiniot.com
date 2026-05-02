import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQAccordion({ items }) {
  return (
    <div>
      {items.map((item, i) => (
        <Accordion key={i} disableGutters elevation={0} sx={{ border: "1px solid", borderColor: "divider", "&:not(:last-child)": { borderBottom: 0 }, "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>{item.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">{item.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}