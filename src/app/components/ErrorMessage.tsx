import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="error-message">
    <h2>Oops! Something went wrong</h2>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
