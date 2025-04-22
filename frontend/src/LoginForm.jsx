import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/login", formValues);
      console.log(res.data);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.message || "Invalid email or password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <input
    type="email"
    name="email"
    value={formValues.email}
    onChange={handleInputChange}
    placeholder="Email"
    className="auth-input"
    required
  />
  <input
    type="password"
    name="password"
    value={formValues.password}
    onChange={handleInputChange}
    placeholder="Password"
    className="auth-input"
    required
  />
  <button type="submit" className="auth-button">
    {loading ? "Please wait..." : "Login"}
  </button>
</form>

  );
};

export default LoginForm;
