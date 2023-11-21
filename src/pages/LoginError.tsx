import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginError() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/login"), 500);
  }, []);

  return <div>There was a problem logging in, please try again.</div>;
}

export default LoginError;
