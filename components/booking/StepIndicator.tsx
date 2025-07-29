// components/booking/StepIndicator.tsx
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  return (
    <div className="card mx-4 sm:mx-0">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-brand-primary">
          Step {currentStep} of {totalSteps}
        </p>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-primary text-white">
          {steps[currentStep - 1]}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-700 ease-in-out barber-pole-progress"
          style={{ 
            width: `${(currentStep / totalSteps) * 100}%`
          }}
        />
      </div>
      
      {/* Step dots for larger screens */}
      <div className="hidden sm:flex justify-between mt-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div
              key={step}
              className={`flex flex-col items-center text-xs ${
                  isActive
                    ? 'text-brand-primary'
                    : isCompleted
                    ? 'text-success-green'
                    : 'text-gray-400'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full mb-1 transition-colors ${
                  isActive
                    ? 'bg-brand-primary'
                    : isCompleted
                    ? 'bg-success-green-light'
                    : 'bg-gray-300'
                }`}
              />
              <span className="max-w-16 text-center leading-tight">
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
