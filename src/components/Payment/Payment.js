import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const Payment = () => {
  const navigate = useNavigate();

  const initializeRazorpay = () => {
    const options = {
      key: "rzp_live_0b3hgeQpyeuHSx",
      amount: 50000, // amount in paise (500 INR)
      currency: "INR",
      name: "ECaseFile",
      description: "Case File Processing Fee",
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        email: auth.currentUser.email,
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const userId = auth.currentUser.uid;
      await setDoc(doc(db, 'payments', userId), {
        paymentId: response.razorpay_payment_id,
        amount: 500,
        timestamp: new Date()
      });
      navigate('/upload');
    } catch (error) {
      console.error('Error saving payment details:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <p>Processing fee: ₹50</p>

      <div className="benefits-section">
        <h3>Why Choose eFiling Service?</h3>
        <ul>
          <li><span className="checkmark">✔️</span> <strong>Convenience:</strong> File cases from the comfort of your home or office.</li>
          <li><span className="checkmark">✔️</span> <strong>Time-Saving:</strong> Complete the filing process quickly and efficiently.</li>
          <li><span className="checkmark">✔️</span> <strong>Energy Efficiency:</strong> Save energy by eliminating the need for travel.</li>
          <li><span className="checkmark">✔️</span> <strong>Automated Filing:</strong> Reduces errors and ensures completeness.</li>
          <li><span className="checkmark">✔️</span> <strong>Accessibility:</strong> Available 24/7 for your convenience.</li>
          <li><span className="checkmark">✔️</span> <strong>Document Management:</strong> Easily upload and manage your documents.</li>
          <li><span className="checkmark">✔️</span> <strong>Immediate Confirmation:</strong> Receive instant confirmation of your filing.</li>
          <li><span className="checkmark">✔️</span> <strong>Reduced Paperwork:</strong> Minimize physical paperwork and clutter.</li>
          <li><span className="checkmark">✔️</span> <strong>Cost-Effective:</strong> Save on travel, printing, and mailing costs.</li>
          <li><span className="checkmark">✔️</span> <strong>Enhanced Security:</strong> Built-in security measures protect your sensitive information.</li>
          <li><span className="checkmark">✔️</span> <strong>Tracking and Updates:</strong> Easily track the status of your filings.</li>
          <li><span className="checkmark">✔️</span> <strong>User-Friendly Interface:</strong> Intuitive design for easy navigation.</li>
        </ul>
      </div>
      <button onClick={initializeRazorpay}>Pay Now</button>
    </div>
  );
};

export default Payment;