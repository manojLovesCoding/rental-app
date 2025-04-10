import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx"; // Import Sidebar
import PaymentForm from "../components/Payment/PaymentForm";
import CardDetailsForm from "../components/Payment/CardDetailsForm";
import UPIInput from "../components/Payment/UPIInput";
import PaymentSuccessMessage from "../components/Payment/PaymentSuccessMessage";
import ConfirmPaymentModal from "../components/Payment/ConfirmPaymentModal";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSubmit = (details) => {
    setPaymentDetails(details);
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    setShowConfirmModal(false);
    setPaymentSuccess(true);
  };

  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Rent Payment</h2>
        {!paymentSuccess ? (
          <>
            <PaymentForm
              setPaymentMethod={setPaymentMethod}
              onSubmit={handlePaymentSubmit}
            />
            {paymentMethod === "card" && (
              <CardDetailsForm onSubmit={handlePaymentSubmit} />
            )}
            {paymentMethod === "upi" && (
              <UPIInput onSubmit={handlePaymentSubmit} />
            )}
          </>
        ) : (
          <PaymentSuccessMessage />
        )}
        {showConfirmModal && (
          <ConfirmPaymentModal
            details={paymentDetails}
            onConfirm={confirmPayment}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
