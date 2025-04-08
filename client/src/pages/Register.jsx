import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registered user:", formData);
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <TermsCheckbox
            checked={formData.termsAccepted}
            handleChange={handleChange}
            error={errors.termsAccepted}
          />
          <RegisterButton disabled={!formData.termsAccepted} />
        </form>
      </div>
    </div>
  );
};

const AuthForm = ({ formData, handleChange, errors }) => {
  return (
    <>
      <InputField
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        handleChange={handleChange}
        error={errors.firstName}
      />
      <InputField
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        handleChange={handleChange}
        error={errors.lastName}
      />
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        handleChange={handleChange}
        error={errors.email}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        handleChange={handleChange}
        error={errors.password}
      />
      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        handleChange={handleChange}
        error={errors.confirmPassword}
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>
    </>
  );
};

const InputField = ({
  type,
  name,
  placeholder,
  value,
  handleChange,
  error
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        }`}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const TermsCheckbox = ({ checked, handleChange, error }) => {
  return (
    <div>
      <label className="flex items-center space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={checked}
          onChange={handleChange}
          className="w-5 h-5 text-blue-500 focus:ring-blue-500"
        />
        <span>I agree to the Terms and Conditions</span>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const RegisterButton = ({ disabled }) => {
  return (
    <button
      type="submit"
      className={`w-full p-3 rounded-lg text-white font-semibold transition duration-300 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
      disabled={disabled}
    >
      Register
    </button>
  );
};

export default Register;
