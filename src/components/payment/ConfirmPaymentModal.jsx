const ConfirmPaymentModal = ({ details, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>
        <p>Amount: {details?.amount}</p>
        <button
          onClick={onConfirm}
          className="mt-4 w-full bg-green-500 text-white p-2 rounded"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="mt-2 w-full bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default ConfirmPaymentModal;
