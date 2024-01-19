import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnrollConfirm = () => {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // After 3 seconds, hide the message and navigate to /member
      setShowMessage(false);
      navigate('/member');
    }, 2500);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div>
      {showMessage && <div className='thank-you'>Thank you for enrolling!</div>}
      {/* Add other content or styling as needed */}
    </div>
  );
};

export default EnrollConfirm;