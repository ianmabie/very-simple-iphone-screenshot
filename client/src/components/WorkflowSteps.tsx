interface WorkflowStepsProps {
  currentStep: number;
}

export function WorkflowSteps({ currentStep }: WorkflowStepsProps) {
  const steps = [
    { number: 1, label: 'Upload' },
    { number: 2, label: 'Format' },
    { number: 3, label: 'Export' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 sm:space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.number <= currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-sm font-medium ${
                  step.number <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-px bg-gray-300 w-8 sm:w-16 ml-4 sm:ml-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
