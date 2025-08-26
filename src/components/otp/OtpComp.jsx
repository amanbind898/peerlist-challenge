import { useRef, useState, useEffect } from "react";

export default function OtpComp() {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const correctOtp = "123456";

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Shake animation for incorrect OTP
  useEffect(() => {
    if (isCorrect === false) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  const validateOtp = async (enteredOtp) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsCorrect(enteredOtp === correctOtp);
    
    if (enteredOtp !== correctOtp) {
      // Clear OTP after wrong attempt
      setTimeout(() => {
        setOtp(Array(6).fill(""));
        setIsCorrect(null);
        inputRefs.current[0]?.focus();
      }, 1500);
    }
  };

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      
      // Move to next input
      if (value !== "" && idx < 5) {
        inputRefs.current[idx + 1]?.focus();
      }
      
      // Validate when last digit is entered
      if (idx === 5 && value !== "") {
        const enteredOtp = newOtp.join("");
        validateOtp(enteredOtp);
      } else {
        setIsCorrect(null);
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[idx]) {
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
      setIsCorrect(null);
    }
    
    // Allow arrow key navigation
    if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const pastedDigits = pastedData.replace(/\\D/g, "").split("").slice(0, 6);
    
    if (pastedDigits.length > 0) {
      const newOtp = Array(6).fill("");
      pastedDigits.forEach((digit, idx) => {
        if (idx < 6) newOtp[idx] = digit;
      });
      setOtp(newOtp);
      
      // Focus on the next empty input or last input
      const nextFocusIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextFocusIndex]?.focus();
      
      // Validate if all 6 digits are filled
      if (pastedDigits.length === 6) {
        validateOtp(newOtp.join(""));
      }
    }
  };

const getInputClassName = (idx) => {
  let baseClass = `
    w-10 sm:w-12 md:w-14 lg:w-16
    h-10 sm:h-12 md:h-14 lg:h-16
    text-center text-xl sm:text-2xl md:text-3xl font-semibold
    border-2 rounded-xl
    focus:outline-none transition-all duration-300
    bg-gray-800/50 text-white backdrop-blur-sm
    transform hover:scale-105
  `;

  if (isLoading) {
    baseClass += " border-yellow-400 animate-pulse";
  } else if (isCorrect === true) {
    baseClass += " border-green-400 bg-green-900/30 shadow-lg shadow-green-400/20";
  } else if (isCorrect === false) {
    baseClass += " border-red-400 bg-red-900/30 shadow-lg shadow-red-400/20";
  } else if (otp[idx]) {
    baseClass += " border-blue-400 shadow-lg shadow-blue-400/20";
  } else {
    baseClass += " border-gray-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/20";
  }

  return baseClass;
};



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 border border-white rounded-lg px-4 instrument-serif-regular">
   
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
     
          <h2 className="text-2xl instrument-serif-regular text-white mb-2">Verify Your Identity</h2>
       
        </div>

        {/* OTP Input Container */}
        <div className={`
          bg-white/5 backdrop-blur-lg rounded-2xl p-8 sm:p-8 
          border border-white/10 shadow-2xl
          ${shake ? "animate-shake" : ""}
        `}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
            {otp.map((digit, idx) => (
              <div key={idx} className="flex items-center">
                <input
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  disabled={isLoading}
                  className={getInputClassName(idx)}
                />
                {/* Separator after 3rd input */}
                {idx === 2 && (
                  <div className="mx-3">
                    <div className="w-3 h-0.5 bg-gray-400 rounded"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Status Messages */}
          <div className="text-center min-h-[2rem] flex items-center justify-center">
            {isLoading && (
              <div className="flex items-center gap-2 text-yellow-400">
                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            )}
            
            {isCorrect === true && (
              <div className="flex items-center gap-2 text-green-400 animate-fade-in instrument-serif-regular">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">OTP Verified Successfully!</span>
              </div>
            )}
            
            {isCorrect === false && (
              <div className="flex items-center gap-2 text-red-400 animate-fade-in">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-medium">Incorrect OTP. Please try again.</span>
              </div>
            )}
          </div>

        
        </div>

        {/* Instructions */}
        <div className="text-center mt-6 text-sm text-gray-400 max-w-md instrument-serif-regular">
          <p>💡 <strong>Tip:</strong> You can paste the entire OTP code from your clipboard</p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 20%, 50%, 80%, 100% { transform: translateX(0); }
          10% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          90% { transform: translateX(4px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}