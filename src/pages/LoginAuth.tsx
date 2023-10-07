import FoodieLoveApi from "../api/FoodieLoveApi";
import FormLayout from "../layout/FormLayout";
import { Container } from "@mui/material";
import GoogleButton from "react-google-button";

function LoginAuth() {
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
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <Container sx={{ paddingTop: 5, paddingX: 10 }}>
      <FormLayout title="Login/Signup">
        <div>
          <div>Foodie Auth</div>
          <GoogleButton onClick={redirectToGoggleSSO} />
        </div>
      </FormLayout>
    </Container>
  );
}

export default LoginAuth;
