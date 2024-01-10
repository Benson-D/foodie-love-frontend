import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetAuthUserQuery } from "../service/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setToken } from "../appSlice";

function LoginSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useGetAuthUserQuery();

  useEffect(() => {
    if (data) {
      dispatch(setAuthUser(data?.user ?? null));
      dispatch(setToken(data?.token ?? null));
      setTimeout(() => navigate("/recipes"), 500);
    }
  }, [data]);

  return (
    <Typography sx={{ color: "black", padding: "10px" }}>
      Thanks for logging in!
    </Typography>
  );
}

export default LoginSuccess;
