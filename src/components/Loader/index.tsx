import { Box, CircularProgress } from "@mui/material";

/**
 * Main Load Spinner for page rendering
 * Props: none
 * State: none
 */
function Loader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
