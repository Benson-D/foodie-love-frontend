import { Typography } from "@mui/material";
import { useEffect } from "react";
// import { useGetAuthUserQuery } from "../service/authService";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setAuthUser, setToken } from "../appSlice";

function LoginSuccess() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { data, error } = useGetAuthUserQuery();

  // console.log(data, "<==== data from request", error, "<==== error from request");

  // useEffect(() => {
  //   setTimeout(() => navigate("/recipes"), 500);

  //   if (data) {
  //     dispatch(setAuthUser(data?.user ?? null));
  //     dispatch(setToken(data?.token ?? null));

  //   }
  // }, [data]);

  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <Typography sx={{ color: "black", padding: "10px" }}>
      Thanks for logging in!
    </Typography>
  );
}

export default LoginSuccess;
