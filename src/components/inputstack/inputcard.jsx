"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InputCard() {
  const questions = [
    "What's your name?",
    "What's your email?",
    "What's your favorite color?",
    "What's your phone number?",
    "What's your occupation?"
  ];
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [finished, setFinished] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = async () => {
    if (answers[step].trim() === "") return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setFinished(true);
      }
      setIsAnimating(false);
    }, 200);
  };

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && answers[step].trim()) {
      handleNext();
    }
  };

  const resetForm = () => {
    setStep(0);
    setAnswers(Array(questions.length).fill(""));
    setFinished(false);
    setIsAnimating(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="relative w-full max-w-lg mx-auto min-h-[500px]">
        
        {/* Progress indicator */}
        <div className="mb-6 bg-white rounded-full p-1 shadow-sm">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm text-gray-900 font-medium">
              {finished ? "Complete" : `Step ${step + 1} of ${questions.length}`}
            </span>
            <div className="flex space-x-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx < step || finished ? 'bg-green-500' : 
                    idx === step ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          {!finished && (
            <div className="bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>

        {/* Answered cards stack */}
        <div className="absolute inset-0 top-20 pointer-events-none">
          <AnimatePresence>
            {answers.map((answer, idx) => {
              if (!answer || idx >= step) return null;
              
              const stackPosition = step - idx - 1;
              const maxVisible = 3;
              
              if (stackPosition >= maxVisible) return null;
              
              return (
                <motion.div
                  key={`answered-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ 
                    opacity: 1 - (stackPosition * 0.2),
                    y: stackPosition * 12,
                    scale: 1 - (stackPosition * 0.03),
                    rotate: stackPosition * 1
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-x-0 p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100"
                  style={{ 
                    zIndex: questions.length - stackPosition,
                    filter: `brightness(${1 - stackPosition * 0.1})`
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        {questions[idx]}
                      </p>
                      <p className="text-gray-600 truncate">
                        {answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Active input card or completion message */}
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ 
                opacity: 1, 
                y: Math.min(step, 3) * 12, 
                scale: 1,
                rotate: 0
              }}
              exit={{ opacity: 0, y: -30, scale: 1.04 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="relative p-6 rounded-2xl bg-white shadow-2xl border border-gray-100"
              style={{ zIndex: 100 }}
            >
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {step + 1}
                    </span>
                  </div>
                  <label className="text-xl poppins-medium text-gray-800 flex-1">
                    {questions[step]}
                  </label>
                </div>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    value={answers[step]}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full text-gray-900 poppins-medium px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder-gray-900"
                    placeholder="Type your answer here..."
                    autoFocus
                    disabled={isAnimating}
                  />
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm poppins-medium text-gray-900">
                      Press Enter or click Next to continue
                    </p>
                    
                    <AnimatePresence>
                      {answers[step].trim() && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={handleNext}
                          disabled={isAnimating}
                          className="px-2 py-1 rounded-xl bg-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                          {step === questions.length - 1 ? (
                            <span className="flex  poppins-medium items-center space-x-2">
                              <span>Complete</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          ) : (
                            <span className="flex  poppins-medium items-center space-x-2">
                              <span>Next</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completion"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-2xl text-center"
              style={{ zIndex: 100 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-green-800 mb-3">
                🎉 Thank You!
              </h2>
              <p className="text-green-700 mb-6">
                Your responses have been successfully recorded.
              </p>
              
              <div className="space-y-3 mb-6">
                {answers.map((answer, idx) => (
                  <div key={idx} className="text-left p-3 bg-white/60 rounded-lg">
                    <span className="font-medium text-gray-700">{questions[idx]}</span>
                    <br />
                    <span className="text-gray-600">{answer}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
