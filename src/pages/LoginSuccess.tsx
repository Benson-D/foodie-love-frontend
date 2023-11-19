import { Typography } from "@mui/material";
import { useEffect } from "react";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 500);
  }, []);

  return (
    <Typography sx={{ color: "black", padding: "10px" }}>
      Thanks for logging in!
    </Typography>
  );
}

export default LoginSuccess;
