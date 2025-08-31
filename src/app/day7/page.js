"use client";

import DayPage from "@/components/DayPage";
import { useState, useEffect } from "react";

export default function DayWisePage() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentStepMessage, setCurrentStepMessage] = useState("");

  // Progressive loading simulation with step-by-step progress
  const handleAutoFill = () => {
    setLoading(true);
    setCurrentStep(0);
    setProgress(0);
    setInputValue("");
    setCurrentStepMessage("");

    // Simulate progressive steps with realistic timing
    const steps = [
      { delay: 500, message: "Analyzing input patterns..." },
      { delay: 1200, message: "Fetching AI suggestions..." },
      { delay: 800, message: "Processing contextual data..." },
      { delay: 1000, message: "Optimizing recommendations..." },
      { delay: 700, message: "Finalizing autofill content..." }
    ];

    let totalDelay = 0;
    steps.forEach((step, index) => {
      totalDelay += step.delay;
      setTimeout(() => {
        setCurrentStep(index + 1);
        setCurrentStepMessage(step.message);
        setProgress(((index + 1) / steps.length) * 100);
        
        // Complete loading and fill input
        if (index === steps.length - 1) {
          setTimeout(() => {
            setLoading(false);
            setInputValue("AI-generated: Full Stack Developer with 5+ years experience in React, Node.js, and cloud technologies");
            setCurrentStep(0);
            setProgress(0);
            setCurrentStepMessage("");
          }, 300);
        }
      }, totalDelay);
    });
  };

  return (
    <DayPage dayNumber={7} title="AI Autofill Experience">
      <div className="max-w-2xl mx-auto px-8 py-12 space-y-8 instrument-serif-regular">
        {/* Header Section */}
        <div className="text-center space-y-4">
      
          <p className="text-gray-100 text-lg">Let AI craft your perfect professional summary</p>
        </div>

        {/* Input Section with Overlay */}
        <div className="relative">
          <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 transition-all duration-300 ${
            loading ? "blur-sm" : ""
          }`}>
            <div className="space-y-3">
              <label htmlFor="profileInput" className="block text-gray-700 instrument-serif-regular tracking-wide">
                Professional Summary
              </label>
              <div className="relative">
                <textarea
                  id="profileInput"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your role, experience, and key skills..."
                  rows={4}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAutoFill}
                disabled={loading}
                className={`px-8 py-3 rounded-xl instrument-serif-regular transition-all duration-200 transform ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-900 text-white hover:from-blue-900 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? "Generating..." : "✨ Generate with AI"}
              </button>
              
              {inputValue && !loading && (
                <button
                  onClick={() => setInputValue("")}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-2xl backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-500 ease-out scale-100">
                <div className="text-center space-y-6">
                  {/* Current Step Display */}
                  <div className="space-y-4">
                  

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Step {currentStep} of {stepLabels.length}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {currentStepMessage || "Preparing to generate..."}
                      </p>
                    </div>
                  </div>

                  {/* Progress Ring */}
                  <div className="relative w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="text-blue-500 transition-all duration-500 ease-out"
                        strokeDasharray={`${progress}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-700">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>

                  {/* Processing Dots */}
                  <div className="flex justify-center space-x-2">
                    <ProcessingDots />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DayPage>
  );
}

const stepLabels = [
  "Analyzing input patterns",
  "Fetching AI suggestions", 
  "Processing contextual data",
  "Optimizing recommendations",
  "Finalizing autofill content"
];

// Animated Icons
function LoadingIcon() {
  return (
    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
  );
}

function ProcessingDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </>
  );
}
