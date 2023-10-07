import { useEffect } from "react";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 500);
  }, []);

  return <div>Thanks for Logging In!</div>;
}

export default LoginSuccess;
