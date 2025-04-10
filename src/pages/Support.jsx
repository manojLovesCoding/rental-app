import Sidebar from "../components/Sidebar.jsx";
import FAQsAccordion from "../components/Support/FAQsAccordion.jsx";
import ContactForm from "../components/Support/ContactForm.jsx";
import LiveChatButton from "../components/Support/LiveChatButton.jsx";

function Support() {
  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6">Support & FAQs</h2>

        {/* FAQs Accordion Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Frequently Asked Questions
          </h3>
          <FAQsAccordion />
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ContactForm />
        </div>

        {/* Live Chat Button */}
        <div className="text-center mt-6">
          <LiveChatButton />
        </div>
      </div>
    </div>
  );
}

export default Support;
