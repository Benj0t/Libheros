import { useEffect, useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import authMe from "../requests/authMe";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await authMe();
        navigate("/");
      } catch (err) {}
    };
    fetchData();
  });
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
