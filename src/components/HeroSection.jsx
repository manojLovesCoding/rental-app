import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Welcome to RentPay
      </h1>
      <p className="text-xl text-gray-700 mb-6 max-w-2xl">
        Effortless rent payment and reporting for tenants and landlords. Secure
        transactions, automated reminders, and easy reporting.
      </p>

      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg shadow-md hover:bg-blue-100 transition"
        >
          Login
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
