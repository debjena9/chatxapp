import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify"

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { currentUser, register, setError } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await register(formData.username, formData.email, password);
      navigate("/profile");
    } catch (e) {
      setError("Failed to register");
      toast.error("Failed to register");
    }

    setLoading(false);
  };

  return (
    <div className="min-vh-90 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Register your account</h2>
        <form onSubmit={handleFormSubmit}>
          {["username", "email", "password", "confirmPassword"].map((field) => (
            <div key={field} className="mb-3">
              <input
                type={field.includes("password") ? "password" : "text"}
                className="form-control"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
          >
            Register
          </button>
          <div className="text-center mt-3">
            <Link to="/login" className="text-primary">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
