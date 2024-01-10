import { Container, Paper, Grid, Box, Avatar, Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { LockOutlined } from "@mui/icons-material";

function LoginAuth() {
  const redirectToGoggleSSO = () => {
    location.href = "https://foodieloveapi.onrender.com/auth/google";
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={6}
        sx={{
          backgroundImage: "url(/img/foodie-background-3.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Grid>
      <Grid item xs={12} sm={12} md={6} component={Paper}>
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
          <Container sx={{ marginTop: "2rem" }}>
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
