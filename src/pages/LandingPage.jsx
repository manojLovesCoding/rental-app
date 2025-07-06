import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-blue-600">RentManage</h1>
        <nav className="space-x-8 hidden md:flex text-lg font-medium">
          <a href="#features" className="hover:text-blue-500 transition-colors">
            Features
          </a>
          <a
            href="#testimonials"
            className="hover:text-blue-500 transition-colors"
          >
            Testimonials
          </a>
          <a href="#contact" className="hover:text-blue-500 transition-colors">
            Contact
          </a>
        </nav>
        <button className="hidden md:inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full hover:bg-blue-200 transition">
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold leading-tight text-gray-900">
            Simplify Rent Payments <br /> & Tenant Reports
          </h2>
          <p className="text-xl text-gray-600">
            Manage rent collection, tenant reports, and financial insights — all
            in one powerful dashboard.
          </p>
          <button className="text-white bg-blue-600 hover:bg-blue-700 transition px-8 py-3 text-lg rounded-full shadow-lg">
            Get Started Free
          </button>
        </div>
        <div className="md:w-1/2 mb-12 md:mb-0">
          <img
            src="https://source.unsplash.com/700x450/?apartment,technology"
            alt="App preview"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 bg-white">
        <h3 className="text-4xl font-semibold text-center mb-16">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-8 bg-gray-50 rounded-3xl shadow-md hover:shadow-xl transition">
            <h4 className="text-2xl font-semibold mb-3">
              Automated Rent Collection
            </h4>
            <p className="text-gray-600">
              Collect rent on time with auto reminders and multiple payment
              options.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl shadow-md hover:shadow-xl transition">
            <h4 className="text-2xl font-semibold mb-3">Real-Time Reports</h4>
            <p className="text-gray-600">
              Gain instant insights into payments and track financial
              performance.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl shadow-md hover:shadow-xl transition">
            <h4 className="text-2xl font-semibold mb-3">Tenant Management</h4>
            <p className="text-gray-600">
              Easily manage profiles, agreements, and payment timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-20 px-8">
        <h3 className="text-4xl font-semibold text-center mb-14">
          What Our Users Say
        </h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
            <p className="italic text-gray-700">
              “RentEase made my property management effortless. I get notified
              of everything in real-time!”
            </p>
            <p className="mt-4 font-semibold text-gray-800">
              — Priya S., Landlord
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
            <p className="italic text-gray-700">
              “Finally, a simple way to pay rent and view my payment history
              anytime.”
            </p>
            <p className="mt-4 font-semibold text-gray-800">
              — Arjun R., Tenant
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-10 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 RentEase. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
