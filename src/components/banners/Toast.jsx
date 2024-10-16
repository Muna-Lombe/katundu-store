import React, { useEffect } from 'react';

const Toast = ({ error, message, onOpen, onClose }) => {
  // console.log("toast", error, message);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    onOpen();
    return () => clearTimeout(timer);
  }, [onClose]);

  const SuccessToast = () => (
    <div className="toast toast-success flex p-1 bg-green-300 border border-green-500 rounded-md">
      <div className="icon">
        <svg width="16" height="16" fill="currentColor"   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6644 5.25259C21.0772 5.61951 21.1143 6.25158 20.7474 6.66437L10.0808 18.6644C9.89099 18.8779 9.61898 19 9.33334 19C9.04771 19 8.7757 18.8779 8.58593 18.6644L3.2526 12.6644C2.88568 12.2516 2.92286 11.6195 3.33565 11.2526C3.74843 10.8857 4.3805 10.9229 4.74742 11.3356L9.33334 16.4948L19.2526 5.33564C19.6195 4.92286 20.2516 4.88568 20.6644 5.25259Z" /></svg>
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  )
  const ErrorToast = () => (
    <div className="toast toast-error flex gap-1 items-center p-1 px-4 bg-red-100 border border-red-400 text-slate-500 rounded-md">
      <div className="icon">
        <svg width="16" height="16" fill="#ef4444" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"/></svg>
      </div>
      <div className="message ">
        <p>{message}</p>
      </div>

    </div>

  )
  return (
    error ?
      <ErrorToast />
    : <SuccessToast />
  )
  return (
    <div className={`toast ${error ? 'toast-error' : 'toast-success'}`}>
      <div className="icon">
        {error ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div className="message">
        <p className="font-bold">{error ? 'Error' : 'Success'}</p>
        <p>{message}</p>
      </div>
      <div className="close" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
};

export default Toast;