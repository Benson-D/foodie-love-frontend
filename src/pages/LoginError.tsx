import { useEffect } from "react";

function LoginError() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 500);
  }, []);

  return <div>There was a problem logging in, please try again.</div>;
}

export default LoginError;
