import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box component="div" className="loaderPosition">
      <CircularProgress sx={{ color: "#ee7000" }} />
    </Box>
  );
}