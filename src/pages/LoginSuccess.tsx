import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/recipes"), 9000);
  }, []);

  return (
    <Typography sx={{ color: "black", padding: "10px" }}>
      Thanks for logging in!
    </Typography>
  );
}

export default LoginSuccess;
