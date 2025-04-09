import {
  ShieldCheck,
  Bell,
  CreditCard,
  FileText,
  Users,
  Settings
} from "lucide-react";

function FeatureCards() {
  const features = [
    {
      title: "Secure Payments",
      description: "Make hassle-free and secure online rent payments.",
      icon: <ShieldCheck size={40} className="text-blue-600" />
    },
    {
      title: "Automated Reminders",
      description: "Never miss a due date with smart rent reminders.",
      icon: <Bell size={40} className="text-blue-600" />
    },
    {
      title: "Multiple Payment Options",
      description: "Pay via credit card, debit card, UPI, or bank transfer.",
      icon: <CreditCard size={40} className="text-blue-600" />
    },
    {
      title: "Detailed Reports",
      description: "Track your rent payments with real-time reports.",
      icon: <FileText size={40} className="text-blue-600" />
    },
    {
      title: "Tenant Management",
      description: "Easily manage tenants, leases, and rental agreements.",
      icon: <Users size={40} className="text-blue-600" />
    },
    {
      title: "Easy Settings",
      description: "Customize your rent preferences and notifications.",
      icon: <Settings size={40} className="text-blue-600" />
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureCards;
