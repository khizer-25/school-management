import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      return alert("Passwords do not match!");
    }

    const payload = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    };

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/register", payload);
      console.log(res.data);
      alert("Admin registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    value={formValues.name}
    onChange={handleInputChange}
    placeholder="Full Name"
    className="auth-input"
    required
  />
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
  <input
    type="password"
    name="confirmPassword"
    value={formValues.confirmPassword}
    onChange={handleInputChange}
    placeholder="Confirm Password"
    className="auth-input"
    required
  />
  <button type="submit" className="auth-button">
    {loading ? "Please wait..." : "Register"}
  </button>
</form>
  );
};

export default RegisterForm;
