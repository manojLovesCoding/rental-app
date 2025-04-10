import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when input changes
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate an API request
      setTimeout(() => {
        console.log("Logged in user:", formData);
        navigate("/dashboard"); // Redirect on success
        setIsLoading(false);
      }, 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          {isLoading ? (
            <button
              disabled
              className="w-full p-2 rounded bg-gray-400 text-white cursor-not-allowed"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Login
            </button>
          )}
          <ForgotPasswordLink />
        </form>
      </div>
    </div>
  );
};

const AuthForm = ({
  formData,
  handleChange,
  errors,
  showPassword,
  togglePasswordVisibility
}) => {
  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={`w-full p-2 border rounded ${
          errors.email ? "border-red-500" : ""
        }`}
        required
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.password ? "border-red-500" : ""
          }`}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-2 text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}
    </>
  );
};

const ForgotPasswordLink = () => {
  return (
    <div className="text-center text-sm mt-2">
      <Link to="/forgot-password" className="text-blue-500 hover:underline">
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
