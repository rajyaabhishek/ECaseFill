import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaInfoCircle, FaFile } from 'react-icons/fa';
import { auth, db } from '../../firebase/config';
import { sendThankYouEmail } from '../../services/emailService';
import ConsentModal from './ConsentModal';
import './FileUpload.css';

const CLOUD_NAME = "dtqnrxr63";
const UPLOAD_PRESET = "ecasefile";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    checkUserConsent();
  }, []);

  const checkUserConsent = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setError('Please login first');
        return;
      }
      const consentDoc = await getDoc(doc(db, 'userConsent', userId));
      if (!consentDoc.exists()) {
        setShowConsentModal(true);
      } else {
        setHasConsented(true);
      }
    } catch (error) {
      setError('Error checking consent: ' + error.message);
    }
  };

  const handleConsent = async () => {
    try {
      const userId = auth.currentUser?.uid;
      await setDoc(doc(db, 'userConsent', userId), {
        consented: true,
        timestamp: new Date()
      });
      setHasConsented(true);
      setShowConsentModal(false);
    } catch (error) {
      setError('Error saving consent: ' + error.message);
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const simulateProgress = (callback) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 90) {
        clearInterval(interval);
        progress = 90;
      }
      setUploadProgress(Math.min(progress, 90));
    }, 500);
    return interval;
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setUploading(true);
    setError('');
    setSuccessMessage('');

    const progressInterval = simulateProgress();

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      const timestamp = Date.now();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('cloud_name', CLOUD_NAME);
      formData.append('resource_type', 'auto');
      formData.append('folder', `cases/${userId}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      clearInterval(progressInterval);

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}. Response: ${responseText}`);
      }

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Failed to parse response: ${responseText}`);
      }

      setUploadProgress(100);

      const caseData = {
        userId: userId,
        fileName: file.name,
        fileURL: responseData.secure_url,
        uploadDate: new Date(),
        status: 'pending',
        phoneNumber: phoneNumber,
        caseId: `CASE-${timestamp}-${userId.substr(0, 5)}`,
        fileSize: file.size,
        fileType: file.type
      };

      await addDoc(collection(db, 'cases'), caseData);
      
      setSuccessMessage('File uploaded successfully!');
      setShowPaymentSection(true);
      
    } catch (error) {
      console.error('Upload error:', error);
      setError('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handlePaymentComplete = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userEmail = auth.currentUser.email;
      
      // First save payment details
      await setDoc(doc(db, 'payments', userId), {
        timestamp: new Date(),
        status: 'pending',
        email: userEmail
      });

      // Then send email
      const emailSent = await sendThankYouEmail(userEmail);
      if (!emailSent) {
        console.warn('Failed to send confirmation email');
        setError('Payment recorded but email notification failed. Our team will contact you.');
      }

      setPaymentComplete(true);
      setShowPaymentSection(false);
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Error processing payment. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    if (!hasConsented) {
      setError('Please accept the consent terms before uploading files');
      setShowConsentModal(true);
      return;
    }
    
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  return (
    <div className="upload-container">
      {paymentComplete ? (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Thank You!</h2>
          <p>Your case will be submitted within 1 hour.</p>
          <p>We have sent you a confirmation email for your file processing and submission.</p>
          <p>Just Relax and we will handle the rest.</p>
        </div>
      ) : (
        <>
          <h2>Upload Your Case File</h2>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-notification">{successMessage}</div>}
          
          {!showPaymentSection ? (
            <form onSubmit={handleFileUpload} className="upload-form">
              <div className="file-upload-area">
                <label htmlFor="file-upload" className={`file-upload-label ${!hasConsented ? 'disabled' : ''}`}>
                  <FaFile className="file-icon" />
                  <div className="upload-text">
                    {file ? file.name : hasConsented ? 'Choose a file or drag it here' : 'Please accept consent terms first'}
                    <div className="file-size-limit">Maximum file size: 10MB</div>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  disabled={!hasConsented}
                />
                {!hasConsented && (
                  <div className="consent-warning">
                    <FaInfoCircle className="info-icon" />
                    <p>Please accept the consent terms before uploading files</p>
                  </div>
                )}
                {file && (
                  <div className="file-info">
                    <p>Selected file: {file.name}</p>
                    <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your 10-digit phone number"
                  required
                />
                <small>We'll use this to contact you about your case</small>
              </div>
              
              {uploading && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
              )}
              
              <div className="consent-reminder">
                <FaInfoCircle className="info-icon" />
                <p>By uploading, you agree to our <button 
                  type="button" 
                  className="text-button"
                  onClick={() => setShowConsentModal(true)}
                >terms and conditions</button>.</p>
              </div>
              
              <button 
                type="submit" 
                className="upload-button"
                disabled={uploading || !hasConsented}
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </button>
            </form>
          ) : (
            <div className="payment-section">
              <div className="payment-header">
                <h3>Complete Payment</h3>
                <div className="payment-badge">Secure Payment</div>
              </div>
              
              <div className="payment-card">
                <p className="payment-amount">Amount to Pay: <span>₹100</span></p>
                
                <div className="qr-section">
                  <div className="qr-wrapper">
                    <img 
                      src={process.env.PUBLIC_URL + '/qr-code.png'} 
                      alt="Payment QR Code" 
                      className="qr-code"
                      onError={(e) => {
                        if (!qrError) {
                          setQrError(true);
                          e.target.src = process.env.PUBLIC_URL + '/qr-code.png';
                        }
                      }}
                    />
                    <p className="qr-instruction">Scan to pay via UPI</p>
                  </div>
                </div>
                
                <div className="payment-instructions">
                  <h4>How to pay:</h4>
                  <ol>
                    <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                    <li>Scan the QR code above</li>
                    <li>Complete the payment</li>
                    <li>Click "Done" below after payment is complete</li>
                  </ol>
                </div>
                
                <button onClick={handlePaymentComplete} className="payment-button">
                  Done
                </button>
              </div>
            </div>
          )}
          
          <div className="benefits-section">
            <h3>Why Choose eFiling Service?</h3>
            <ul className="benefits-list">
              <li><FaCheckCircle className="check-icon" /> <span>Convenient filing from anywhere</span></li>
              <li><FaCheckCircle className="check-icon" /> <span>Secure document handling</span></li>
              <li><FaCheckCircle className="check-icon" /> <span>Fast processing and submission</span></li>
              <li><FaCheckCircle className="check-icon" /> <span>24/7 availability</span></li>
              <li><FaCheckCircle className="check-icon" /> <span>Reduced paperwork</span></li>
              <li><FaCheckCircle className="check-icon" /> <span>Cost-effective solution</span></li>
            </ul>
          </div>
        </>
      )}
      
      <ConsentModal 
        isOpen={showConsentModal} 
        onClose={() => setShowConsentModal(false)} 
        onAgree={handleConsent} 
      />
    </div>
  );
};

export default FileUpload;