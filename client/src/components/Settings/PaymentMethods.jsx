function PaymentMethods() {
  return (
    <div>
      <h4 className="text-md font-medium">Saved Payment Methods</h4>
      <ul className="space-y-2 mt-2">
        <li className="flex justify-between">
          <span>Visa Card (**** **** **** 1234)</span>
          <button className="text-blue-600">Remove</button>
        </li>
        <li className="flex justify-between">
          <span>Mastercard (**** **** **** 5678)</span>
          <button className="text-blue-600">Remove</button>
        </li>
      </ul>
      <div className="mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add New Payment Method
        </button>
      </div>
    </div>
  );
}

export default PaymentMethods;
