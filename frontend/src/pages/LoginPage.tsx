import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/Signup";

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignUp = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };
  return (
    <div className="App">
      {isLogin ? (
        <Login switchToSignUp={switchToSignUp} />
      ) : (
        <SignUp switchToLogin={switchToLogin} />
      )}
    </div>
  );
};
export default LoginPage;
