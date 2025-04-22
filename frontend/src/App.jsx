import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import "./App.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // default to login

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="auth-container">
      <div className="auth-box">
      <div className="auth-heading">{isLogin ? "Login" : "Signup"}</div>
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="auth-footer">
          <span className="auth-link" onClick={toggleMode}>
            {isLogin ? "Signup" : "Login"}
          </span>
          <span className="auth-link">Reset Password</span>
        </div>
      </div>
    </div>
  );
};

export default App;
