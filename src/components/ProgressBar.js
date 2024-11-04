import { useState } from "react";

const ProgressBar = ({ blogPoint, thsName, color }) => {
  const [steps, setStep] = useState({
    stepsCount: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    currentStep: blogPoint // currentStep değeri blogPoint değerine ayarlandı
  });

  return (
    <div className="my-5 max-w-lg mx-auto px-4 sm:px-0">
      <ul aria-label="Steps" className="flex items-center">
        {steps.stepsCount.map((item, idx) => (
          <li
            key={idx}
            aria-current={steps.currentStep === idx + 1 ? "step" : false}
            className="flex-1 last:flex-none flex items-center"
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${
                steps.currentStep > idx + 1
                  ? `bg-${color} border-${color}`
                  : steps.currentStep === idx + 1
                  ? `border-${color}`
                  : "border-gray-300"
              }`}
              style={{
                backgroundColor: steps.currentStep > idx + 1 ? color : "transparent",
                borderColor: steps.currentStep >= idx + 1 ? color : "#d1d5db"
              }}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${steps.currentStep === idx + 1 ? `bg-${color}` : "hidden"}`}
                style={{ backgroundColor: steps.currentStep === idx + 1 ? color : "transparent" }}
              ></span>
              {steps.currentStep > idx + 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </div>
            <hr
              className={`w-full border ${
                idx + 1 === steps.stepsCount.length ? "hidden" : steps.currentStep > idx + 1 ? `border-${color}` : "border-gray-700"
              }`}
              style={{ borderColor: steps.currentStep > idx + 1 ? color : "#d1d5db" }}
            />
          </li>
        ))}
      </ul>
      <p className="text-center text-sm" style={{ color: color }}>{thsName}</p>
    </div>
  );
};

export default ProgressBar;
