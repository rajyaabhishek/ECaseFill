import emailjs from '@emailjs/browser';

// Move initialization to a function to ensure it runs after the script loads
const initEmailJS = () => {
  emailjs.init("v4dhdsBADmvRCE7WY");
};
initEmailJS();

export const sendThankYouEmail = async (userEmail) => {
  const templateParams = {
    to_email: userEmail,
    from_name: "ECase Support",
    to_name: userEmail.split('@')[0],
    subject: "Thank You for Using ECase Services",
    reply_to: "contactelawyer@gmail.com",
    phone_number: "+91 8826275476",
    support_email: "contactelawyer@gmail.com",
    // Add message parameter as it might be required by your template
    message: "Thank you for choosing our services!"
  };

  try {
    const response = await emailjs.send(
      "service_y1ykvg8",
      "template_7l24shq",
      templateParams,
      "v4dhdsBADmvRCE7WY" // Add public key here as well
    );
    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    return false;
  }
};