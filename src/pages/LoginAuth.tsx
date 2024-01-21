import {
  Container,
  Paper,
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { LockOutlined } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { useVerifyOAuth2Mutation } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser, setToken } from "../appSlice";

function LoginAuth() {
  const [verifyOAuth2] = useVerifyOAuth2Mutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const verifiedUser = await verifyOAuth2(codeResponse).unwrap();

      dispatch(setAuthUser(verifiedUser?.user));
      dispatch(setToken(verifiedUser?.token));
      navigate("/recipes");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

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
            <Button
              onClick={() => login()}
              sx={{
                border: "1px solid #dadce0",
                color: "#3c4043",
                borderRadius: "20px",
              }}
            >
              Sign in with Google <GoogleIcon sx={{ marginLeft: "12px" }} />
            </Button>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginAuth;
