import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify"

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, login, setError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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

    try {
      setError("");
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/");
    } catch (e) {
      setError("Failed to login");
      toast.error("Failed to login")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center " style={{ minHeight: "70vh" }}>
      <div className="card w-30 mt-10" style={{ border: '0' }}>
        <div className="card-body">
          <h2 className="card-title text-center mt-4 mb-4">Login to your account</h2>
          <form className="mb-8" onSubmit={handleFormSubmit}>
            {["email", "password"].map((field) => (
              <div key={field} className="mb-3">
                <input
                  type={field.includes("password") ? "password" : "email"}
                  id={field}
                  name={field}
                  autoComplete={field === "password" ? "current-password" : "email"}
                  required
                  className="form-control"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="mb-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100"
              >
                Login
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-sm">
                <Link to="/register" className="text-link">
                  Don't have an account? Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
