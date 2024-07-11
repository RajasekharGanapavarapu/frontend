import { useState, useEffect } from "react";

const CustomAlert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Close the alert after 3 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return visible ? (
    <div
      className={`custom-alert alert alert-${type} alert-dismissible fade show fixed-top d-flex justify-content-center`}
      role="alert"
      style={{ maxWidth: "500px", margin: "0 auto" }} // Adjust the max-width as needed
    >
      <button type="button" className="btn-close" onClick={onClose}></button>
      <div className="container">{message}</div>
    </div>
  ) : null;
};

export default CustomAlert;