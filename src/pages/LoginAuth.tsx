import FoodieLoveApi from "../api/FoodieLoveApi";
import { Container, Paper, Grid, Box, Avatar, Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "../appSlice";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function LoginAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAuthUser = async () => {
    try {
      const response = await FoodieLoveApi.getAuthUser();
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(response));
      navigate("/recipes");
    } catch (err) {
      console.error("User not authenticated");
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
    }
  };

  const redirectToGoggleSSO = async () => {
    let timer: number | null = null;

    const googleLoginURL = "http://localhost:3001/auth/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500, height=600",
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser();

          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(/img/foodie-background-3.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper}>
        <Box
          sx={{
            paddingTop: 5,
            paddingX: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Container sx={{ marginTop: "2rem", width: "100%" }}>
            <GoogleButton
              onClick={redirectToGoggleSSO}
              style={{ width: "100%" }}
            />
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginAuth;
