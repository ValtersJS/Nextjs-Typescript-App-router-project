import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    <h2 className="font-bold text-lg">Oops! Something went wrong</h2>
    <p className="mt-2">{message}</p>
  </div>
);

export default ErrorMessage;
